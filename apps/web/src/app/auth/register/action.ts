'use server'

import { prisma } from '@simposio-pai/prisma'
import { hash } from 'bcryptjs'

import { RegisterFormSchema, registerFormSchema } from './form-schema'

export async function createUser(data: RegisterFormSchema) {
  console.log('data', data)

  try {
    console.log('registerFormSchema', registerFormSchema)
    const { name, email, password } = registerFormSchema.parse(data)

    console.log('name', name)

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (userExists) {
      return { error: true, message: 'Usuário já existe' }
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    })

    return {
      error: false,
      message: 'Usuário criado com sucesso',
    }
  } catch (error) {
    console.log('error', error)
    return { error: true, message: JSON.stringify(error) }
  }
}
