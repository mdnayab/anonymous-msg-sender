import {z} from 'zod'

export const signInSchema = z.object({
  Identifier: z.string(),     // Identifier(email/username)
  passeord: z.string()
})