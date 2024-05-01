import { z } from 'zod'

export const astrophotographyFields = {
  title: z.string().min(1),
  date: z.coerce.date(),
  equipment: z.string().min(1),
  image_details: z.string().min(1),
}

export const astrophotographySchema = z.object(astrophotographyFields)
export const astrophotographySchemaWithEnrolledId = z.object({
  ...astrophotographyFields,
  enrolledId: z.string().min(1),
  photo: z.string(),
  termsOfUse: z.string(),
})
