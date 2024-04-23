import { z } from 'zod'

export const registerFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email({ message: 'Use admin@rocketseat.team' }),
  password: z.string().min(1, { message: 'Use 123456' }),
})

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
