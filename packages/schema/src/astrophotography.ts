import { z } from 'zod'

export const astrophotographyFields = {
  title: z.string().min(1),
}

export const astrophotographySchema = z.object(astrophotographyFields)
export const astrophotographySchemaWithEnrolledId = z.object({
  ...astrophotographyFields,
  enrolledId: z.string().min(1),
  photo: z.string(),
  photoWithWatermark: z.string(),
})
