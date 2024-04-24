import { z } from 'zod'

export const workFields = {
  title: z.string().min(1),
  presentersName: z.string().min(1),
  presentersInstitute: z.string().min(1),
  authorsNames: z.array(z.string().min(1)).min(1),
  abstract: z.string().min(1),
}

export const workSchema = z.object(workFields)
export const workSchemaWithEnrolledId = z.object({
  ...workFields,
  enrolledId: z.string().min(1),
})
