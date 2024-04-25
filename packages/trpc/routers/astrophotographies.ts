import { moveFile } from '@simposio-pai/cloudflare'
import { env } from '@simposio-pai/env'
import { prisma } from '@simposio-pai/prisma'
import { astrophotographySchemaWithEnrolledId } from '@simposio-pai/schema'
import {
  new_astrophotography,
  new_astrophotography_owner,
  ses,
} from '@simposio-pai/ses'
import { TRPCError } from '@trpc/server'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const astrophotographiesRouter = createTRPCRouter({
  createAstrophotography: publicProcedure
    .input(astrophotographySchemaWithEnrolledId)
    .mutation(async ({ input }) => {
      const { title, enrolledId, photo, photoWithWatermark } = input

      const existingAstrophotography = await prisma.astrophotography.findFirst({
        where: {
          title,
          enrolledId,
        },
      })

      if (existingAstrophotography) {
        throw new TRPCError({
          message: 'Astrophotography already exists.',
          code: 'BAD_REQUEST',
        })
      }

      const enrolled = await prisma.enrolled.findUnique({
        where: {
          id: enrolledId,
        },
      })

      if (!enrolled) {
        throw new TRPCError({
          message: 'Enrolled not found.',
          code: 'BAD_REQUEST',
        })
      }

      const astrophotography = await prisma.astrophotography.create({
        data: {
          title,
          enrolledId,
          photo,
          photoWithWatermark,
        },
      })

      await moveFile(
        `${env.NODE_ENV}/${photo}`,
        `astrophotographies/${astrophotography.id}/${photo}`,
      )
      await moveFile(
        `${env.NODE_ENV}/${photoWithWatermark}`,
        `astrophotographies/${astrophotography.id}/${photoWithWatermark}`,
      )

      await ses.sendMail({
        to: {
          name: 'Daniel',
          email:
            env.NODE_ENV === 'production'
              ? 'espacoastronomia@gmail.com'
              : 'rs@andreg.com.br',
        },
        subject: `[${env.APP_NAME}] Confirmação de submissão de astrofotografia`,
        templateData: {
          html: new_astrophotography_owner,
          variables: {
            name: enrolled.name,
            email: enrolled.email,
            document: enrolled.document,
            phone: enrolled.phone,
            birthDate: new Date(enrolled.birthDate).toLocaleDateString('pt-BR'),
            city: enrolled.city,
            state: enrolled.state,
            occupationArea: enrolled.occupationArea,
            institute: enrolled.institute,

            title,
            link_photo: `${env.NEXT_PUBLIC_VERCEL_URL}/api/astrophotographies/download/${astrophotography.id}/photo`,
            link_photoWithWatermark: `${env.NEXT_PUBLIC_VERCEL_URL}/api/astrophotographies/download/${astrophotography.id}/photoWithWatermark`,
          },
        },
      })

      await ses.sendMail({
        to: {
          name: enrolled.name,
          email: enrolled.email,
        },
        subject: `[${env.APP_NAME}] Confirmação de submissão de astrofotografia`,
        templateData: {
          html: new_astrophotography,
          variables: {
            name: enrolled.name,
            title,
          },
        },
      })

      return { astrophotography }
    }),
})
