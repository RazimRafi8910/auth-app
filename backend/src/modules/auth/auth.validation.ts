import z from 'zod';

export const registerSchema = z.object({
    fullname:z.string().min(3).max(40),
    email:z.email("email should be valid"),
    password:z.string()
    .min(8,"password should be min 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
    email:z.email("email should be valid"),
    password:z.string()
    .min(8,"password should be min 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const otpSchema = z.object({
    email: z.email("email should be valid"),
    otp:z.number().min(4)
})

export type RegisterUserInput = z.infer<typeof registerSchema>;
export type LoginUserInput = z.infer<typeof loginSchema>;