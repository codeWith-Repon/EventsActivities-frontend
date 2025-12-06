/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch"
import { zodValidator } from "@/lib/zodValidator"
import { registerUserZodSchema } from "@/zod/auth.validation"

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {

    const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    }

    const validatedPayload = zodValidator(payload, registerUserZodSchema)

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
            formData: payload
        }
    }
    try {
        const res = await serverFetch.post("/users/register", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedPayload.data)
        })

        const result = await res.json()

        return result

    } catch (error: any) {
        console.error(error)

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Registration  Failed. Please try again later.",
            formData: payload
        };
    }
}