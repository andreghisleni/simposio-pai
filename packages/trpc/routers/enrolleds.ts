import { env } from '@simposio-pai/env'
import { prisma } from '@simposio-pai/prisma'
import { enrolledFields, enrolledSchema } from '@simposio-pai/schema'
import { new_enrolled, new_enrolled_owner, ses } from '@simposio-pai/ses'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const enrolledsRouter = createTRPCRouter({
  getEnrolled: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const { id } = input

      const enrolled = await prisma.enrolled.findUnique({
        where: {
          id,
        },
        include: {
          works: true,
          astrophotographies: true,
        },
      })

      if (!enrolled) {
        throw new TRPCError({
          message: 'Enrolled not found.',
          code: 'BAD_REQUEST',
        })
      }

      return {
        enrolled,
      }
    }),

  getEnrolleds: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { name } = input

      const enrolleds = await prisma.enrolled.findMany({
        orderBy: {
          name: 'asc',
        },
        where: {
          name: {
            contains: name,
          },
        },
      })

      return { enrolleds }
    }),

  createEnrolled: publicProcedure
    .input(enrolledSchema)
    .mutation(async ({ input }) => {
      const {
        name,
        email,
        document,
        phone,
        birthDate,
        city,
        state,
        occupationArea,
        institute,
        interestedInStayingInAccommodation,
      } = input

      const existingEnrolled = await prisma.enrolled.findFirst({
        where: {
          OR: [
            {
              name,
            },
            {
              email,
            },
            {
              document,
            },
          ],
        },
      })

      if (existingEnrolled) {
        throw new TRPCError({
          message: 'Enrolled already exists.',
          code: 'BAD_REQUEST',
        })
      }

      const enrolled = await prisma.enrolled.create({
        data: {
          name,
          email,
          document,
          phone,
          birthDate,
          city,
          state,
          occupationArea,
          institute,
          interestedInStayingInAccommodation,
        },
      })

      await ses.sendMail({
        to: {
          name: 'Daniel',
          email:
            env.NODE_ENV === 'production'
              ? 'espacoastronomia@gmail.com'
              : 'rs@andreg.com.br',
        },
        subject: `[${env.APP_NAME}] Confirmação de inscrição`,
        templateData: {
          html: new_enrolled_owner,
          variables: {
            name,
            email,
            document,
            phone,
            birthDate: new Date(birthDate).toLocaleDateString('pt-BR'),
            city,
            state,
            occupationArea,
            institute,
            interestedInStayingInAccommodation:
              interestedInStayingInAccommodation ? 'Sim' : 'Não',
          },
        },
      })

      await ses.sendMail({
        to: {
          name,
          email,
        },
        subject: `[${env.APP_NAME}] Confirmação de inscrição`,
        templateData: {
          html: new_enrolled,
          variables: {
            name,
            link: `${env.NEXT_PUBLIC_VERCEL_URL}/subscribe/${enrolled.id}`,
          },
        },
      })

      return { enrolled }
    }),
  updateEnrolled: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        ...enrolledFields,
      }),
    )
    .mutation(async ({ input }) => {
      console.log('input', input)
      const {
        id,
        name,
        email,
        document,
        phone,
        birthDate,
        city,
        state,
        occupationArea,
        institute,
        interestedInStayingInAccommodation,
      } = input

      const enrolled = await prisma.enrolled.findUnique({
        where: {
          id,
        },
      })

      if (!enrolled) {
        throw new TRPCError({
          message: 'Enrolled not found.',
          code: 'BAD_REQUEST',
        })
      }

      const updatedEnrolled = await prisma.enrolled.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          document,
          phone,
          birthDate,
          city,
          state,
          occupationArea,
          institute,
          interestedInStayingInAccommodation,
        },
      })

      return { enrolled: updatedEnrolled }
    }),

  totalEnrolleds: publicProcedure.query(async () => {
    const totalEnrolleds = await prisma.enrolled.count()

    return { totalEnrolleds }
  }),
})
