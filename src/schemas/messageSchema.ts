import {z} from 'zod'

export const messageSchema = z.object({              // Here we add validation in message
  content: z
  .string()
  .min(10, {message: "Content must be atleast 10 characters"})
  .max(300,{message: "Content must be no longer than 300 characters"})
})