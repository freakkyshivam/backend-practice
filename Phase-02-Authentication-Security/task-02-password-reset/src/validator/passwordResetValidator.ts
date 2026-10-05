import z from 'zod'

export const generateOtpValidator = z.object({
    email : z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
})

export const verifyOtpAndResetPasswordValidator = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must be 6 digits"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});