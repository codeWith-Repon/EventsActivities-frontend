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
        error: "Email is required"
    }),
    password: z.string().min(6, "Password is required and must be at least 6 characters").max(100, "Password must be at most 100 characters")
})
