import { prisma } from '@simposio-pai/prisma'
import { compare } from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'

export const credentialsProvider = CredentialsProvider({
  name: 'credentials',

  credentials: {
    email: {
      label: 'E-mail',
      type: 'email',
      placeholder: 'use admin@rocketseat.team',
      value: 'admin@rocketseat.team',
    },
    password: {
      label: 'Password',
      type: 'password',
      value: 'admin',
      placeholder: 'use 123456',
    },
  },
  async authorize(credentials) {
    if (!credentials.email || !credentials.password) {
      return null
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    })

    if (!userExists) {
      return null
    }

    const passwordMatch = await compare(
      credentials.password as string,
      userExists.passwordHash,
    )

    if (!passwordMatch) {
      return null
    }
    return {
      id: userExists.id,
      email: userExists.email,
      name: userExists.name,
      image: userExists.image,
    }
  },
})
