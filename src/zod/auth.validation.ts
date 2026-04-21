/* eslint-disable @typescript-eslint/no-explicit-any */
import z from 'zod'

export const registerUserZodSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must be less than 50 characters" }),
    email: z.email({ message: "Please enter a valid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" })
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Password do not match.",
    path: ["confirmPassword"]
})


export const loginValidationZodSchema = z.object({
    email: z.email({
        error: "Invalid email address."
    }),
    password: z.string().min(6, "Password is required and must be at least 6 characters").max(100, "Password must be at most 100 characters")
})

export const changePasswordZodSchema = z.object({
    oldPassword: z.string().min(6, { message: "Current password must be at least 6 characters" }),
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data: any) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
}).refine((data: any) => data.oldPassword !== data.newPassword, {
    error: "New password must be different from the current password.",
    path: ["newPassword"],
})

export const resetPasswordZodSchema = z.object({
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data: any) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
})

export const forgotPasswordZodSchema = z.object({
    email: z.email({ error: "Please enter a valid email" }),
})

export const resetPasswordTokenZodSchema = z.object({
    token: z.string().min(1, { message: "Reset token is required" }),
    newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Please confirm your password" }),
}).refine((data: any) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match.",
    path: ["confirmPassword"],
})
