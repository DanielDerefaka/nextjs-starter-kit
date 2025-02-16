import { z } from "zod"

export const signInSchema = z.object({
    email: z.string().email("Email is required"),
    password: z.string().min(8, "Password is required"),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("Email is required"),
})

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
});