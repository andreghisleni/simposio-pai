import { env } from '@simposio-pai/env'
import { prisma } from '@simposio-pai/prisma'
import { workFields, workSchemaWithEnrolledId } from '@simposio-pai/schema'
import { new_work, new_work_owner, ses } from '@simposio-pai/ses'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const worksRouter = createTRPCRouter({
  // getWork: publicProcedure
  //   .input(z.object({ id: z.string().uuid() }))
  //   .query(async ({ input }) => {
  //     const { id } = input

  //     const work = await prisma.work.findUnique({
  //       where: {
  //         id,
  //       },
  //     })

  //     if (!work) {
  //       throw new TRPCError({
  //         message: 'Work not found.',
  //         code: 'BAD_REQUEST',
  //       })
  //     }

  //     return {
  //       work,
  //     }
  //   }),

  // getWorks: protectedProcedure
  //   .input(
  //     z.object({
  //       name: z.string().optional(),
  //     }),
  //   )
  //   .query(async ({ input }) => {
  //     const { name } = input

  //     const works = await prisma.work.findMany({
  //       orderBy: {
  //         name: 'asc',
  //       },
  //       where: {
  //         name: {
  //           contains: name,
  //         },
  //       },
  //     })

  //     return { works }
  //   }),

  createWork: publicProcedure
    .input(workSchemaWithEnrolledId)
    .mutation(async ({ input }) => {
      const {
        title,
        enrolledId,
        presentersName,
        presentersInstitute,
        authorsNames,
        abstract,
      } = input

      const existingWork = await prisma.work.findFirst({
        where: {
          title,
          enrolledId,
        },
      })

      if (existingWork) {
        throw new TRPCError({
          message: 'Work already exists.',
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

      const work = await prisma.work.create({
        data: {
          title,
          enrolledId,
          presentersName,
          presentersInstitute,
          authorsNames,
          abstract,
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
        subject: `[${env.APP_NAME}] Confirmação de submissão de trabalho`,
        templateData: {
          html: new_work_owner,
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
            abstract,
            presenterName: presentersName,
            presenterInstitute: presentersInstitute,
            authors: authorsNames.join(', '),
          },
        },
      })

      await ses.sendMail({
        to: {
          name: enrolled.name,
          email: enrolled.email,
        },
        subject: `[${env.APP_NAME}] Confirmação de submissão de trabalho`,
        templateData: {
          html: new_work,
          variables: {
            name: enrolled.name,
            title,
          },
        },
      })

      return { work }
    }),
  updateWork: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        ...workFields,
      }),
    )
    .mutation(async ({ input }) => {
      console.log('input', input)
      const {
        id,
        title,
        presentersName,
        presentersInstitute,
        authorsNames,
        abstract,
      } = input

      const work = await prisma.work.findUnique({
        where: {
          id,
        },
      })

      if (!work) {
        throw new TRPCError({
          message: 'Work not found.',
          code: 'BAD_REQUEST',
        })
      }

      const updatedWork = await prisma.work.update({
        where: {
          id,
        },
        data: {
          title,
          presentersName,
          presentersInstitute,
          authorsNames,
          abstract,
        },
      })

      return { work: updatedWork }
    }),
})
