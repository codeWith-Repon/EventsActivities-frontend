"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch"
import { zodValidator } from "@/lib/zodValidator"
import { loginValidationZodSchema } from "@/zod/auth.validation"
import { parse } from "cookie"
import { setCookie } from "./tokenHandlers"
import { redirect } from "next/navigation"


export const loginUser = async (_currentState: any, formData: any) => {

    const payload = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const validatedPayload = zodValidator(payload, loginValidationZodSchema)

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed.",
            formData: payload,
            errors: validatedPayload.errors
        }
    }

    if (!validatedPayload.success) {
        return {
            success: false,
            message: "Validation failed.",
            formData: payload,
        }
    }

    try {
        let accessTokenObj: null | any = null
        let refreshTokenObj: null | any = null
        const redirectTo = formData.get("redirect") || null

        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validatedPayload.data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await res.json()

        if (!result.success) {
            if (!result.success) {
                return {
                    success: false,
                    message: result.message,
                    formData: payload,
                };
            }
        }

        const setCookieHeaders = res.headers.getSetCookie()

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie)

                if (parsedCookie.accessToken) {
                    accessTokenObj = parsedCookie
                }
                if (parsedCookie.refreshToken) {
                    refreshTokenObj = parsedCookie
                }
            })
        } else {
            return {
                success: false,
                message: "No set cookie header found.",
            }
        }

        if (!accessTokenObj || !refreshTokenObj) {
            throw new Error("Token not found in cookie.")
        }

        await setCookie("accessToken", accessTokenObj.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObj["Max-Age"]),
            path: accessTokenObj["Path"] || "/",
            sameSite: accessTokenObj["SameSite"] || "none",
        })

        await setCookie("refreshToken", refreshTokenObj.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObj["Max-Age"]),
            path: accessTokenObj["Path"] || "/",
            sameSite: accessTokenObj["SameSite"] || "none",
        })

        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            redirect(`${requestedPath}?loggedIn=true`);
        } else {
            redirect("/?loggedIn=true");
        }


        return result
    } catch (error: any) {

        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error
        }

        console.log(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong. Please try again.",
        }
    }
}