import { z } from 'zod'

export const messageSchema = z.object({
    content: z
        .string()
        .min(1, "Message content cannot be empty")
        .max(300, "Message content cannot exceed 300 characters"),
    senderId: z.string().min(1, "Sender ID is required"),
    recipientId: z.string().min(1, "Recipient ID is required"),
})