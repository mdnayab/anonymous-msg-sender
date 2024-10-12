import {z} from 'zod'

export const verifySchema = z.object({                     // Here we add validation in verification process
  code: z.string().length(5, "Verification code must be 5 digits")
})