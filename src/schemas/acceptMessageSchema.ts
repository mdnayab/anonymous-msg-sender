import {z} from 'zod'

export const AcceptMessageSchema = z.object({            // Here we add validation in accept message process
  acceptMessages: z.boolean()
})