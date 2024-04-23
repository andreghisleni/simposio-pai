import { prisma } from '@simposio-pai/prisma'
import { hash } from 'bcryptjs'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const usersRouter = createTRPCRouter({
  createUser: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const hashedPassword = await hash(input.password, 10)

      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          passwordHash: hashedPassword,
        },
      })

      return user
    }),

  getUser: protectedProcedure.query(async ({ input }) => {
    const user = await prisma.user.findFirst({
      where: {
        id: input,
      },
    })

    return user
  }),
})
