import {z} from 'zod'

export const verifySchema = z.object({
    code: z
        .number()
        .min(100000, "Verification code must be a 6-digit number")
        .max(999999, "Verification code must be a 6-digit number"),
})