import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    email: z.email("Invalid email address").optional(),
    role: z.enum(["USER", "ADMIN", "SUPER_ADMIN", "HOST"]).optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    dob: z.coerce.date().optional(),
    address: z.string().min(3, "Address must be at least 3 characters").optional(),
    contactNumber: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, "Invalid contact number")
        .optional(),
    bio: z.string().optional(),
});