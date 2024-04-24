import { z } from 'zod'

export const enrolledFields = {
  name: z.string().min(1),
  email: z.string().email(),
  document: z
    .string()
    .min(10)
    .transform((v) => v.replace(/\D/g, '')),
  phone: z
    .string()
    .min(1)
    .transform((v) => v.replace(/\D/g, '')),
  birthDate: z.coerce.date(),
  city: z.string().min(1),
  state: z.string().min(1),
  occupationArea: z.string().min(1),
  institute: z.string().min(1),
}

export const enrolledSchema = z.object(enrolledFields)
