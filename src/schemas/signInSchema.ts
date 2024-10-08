import {z} from 'zod'

export const signInSchema = z.object({                        // Here we add validation in sign in process
  Identifier: z.string(),     // Identifier(email/username)
  passeord: z.string()
})