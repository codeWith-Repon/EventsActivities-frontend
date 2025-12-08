/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateUserSchema } from "@/zod/user.validation";
import { revalidateTag } from "next/cache";

export async function getUserById(id: string) {
    try {
        const response = await serverFetch.get(`/users/${id}`)
        const result = await response.json()

        return result
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}

export async function getUsers(queryString?: string) {
    try {
        const response = await serverFetch.get(`/users${queryString ? `?${queryString}` : ''}`)
        const result = await response.json()

        return result
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}

export async function updateUser(formData: any) {

    const validationPayload: any = {};

    formData.forEach((value: any, key: any) => {
        if (value) validationPayload[key] = value;
    });
    const validatedPayload = zodValidator(validationPayload, updateUserSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation Error",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Invalid data",
            formData: validationPayload,
        }
    }

    const uploadFormData = new FormData();
    uploadFormData.append("data", JSON.stringify(validatedPayload.data));

    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
        uploadFormData.append("file", file);
    }

    try {
        const response = await serverFetch.patch("/users", { body: uploadFormData });
        const result = await response.json();
        revalidateTag("user-info", { expire: 0 });
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        }
    }
}

export async function deleteUser(id: string) {
    try {
        const response = await serverFetch.delete(`/users/${id}`)
        const result = await response.json()
        return result
    } catch (error: any) {
        console.log(error)
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`,
        }
    }
}