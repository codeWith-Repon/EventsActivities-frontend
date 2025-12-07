/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateUserSchema } from "@/zod/user.validation";

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

export async function updateUser(_prevState: any, formData: any) {

    const validationPayload = {
        name: formData.get("name") || undefined,
        email: formData.get("email") || undefined,
        role: formData.get("role") || undefined,
        gender: formData.get("gender") || undefined,
        dob: formData.get("dob") || undefined,
        address: formData.get("address") || undefined,
        contactNumber: formData.get("contactNumber") || undefined,
        bio: formData.get("bio") || undefined,
        profileImage: formData.get("file") as File || undefined,
    };

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

    try {
        const newFormData = new FormData();

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as File);
        }
        newFormData.append("data", JSON.stringify(validatedPayload.data));

        const response = await serverFetch.patch("/users", {

            body: newFormData,
        })

        const result = await response.json()

        return result
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