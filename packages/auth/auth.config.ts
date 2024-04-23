import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@simposio-pai/prisma'
import type { NextAuthConfig, Session } from 'next-auth'

// import { GoogleProfile } from 'next-auth/providers/google'
import { credentialsProvider } from './credentials-provider'
import { googleProvider } from './google-provider'

export const authConfig = {
  adapter: PrismaAdapter(prisma), // eslint-disable-line
  providers: [googleProvider, credentialsProvider],
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        // const googleProfile = profile as GoogleProfile
        // const [, emailDomain] = googleProfile.email.split('@')

        // if (!emailDomain) {
        //   return false
        // }

        // const company = await db.query.company.findFirst({
        //   where(fields, { eq }) {
        //     return eq(fields.domain, emailDomain)
        //   },
        // })

        // return googleProfile.email_verified && !!company

        return false
      } else if (account?.provider === 'credentials') {
        console.log('credentials', account, profile)

        return true
        // return false
      }

      return false
    },
    jwt({ token, user, session, trigger }) {
      if (user) {
        // token.clinicId = user.clinicId
      }

      function isSessionAvailable(session: unknown): session is Session {
        return !!session
      }

      if (trigger === 'update' && isSessionAvailable(session)) {
        token.name = session.user.name
      }

      return token
    },
    session({ session, ...params }) {
      if ('token' in params && session.user) {
        // session.user.clinicId = params.token.clinicId
        session.user.id = params.token.sub!
      }

      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnWebhooks = nextUrl.pathname.startsWith('/api/webhooks')
      const isOnPublicAPIRoutes = nextUrl.pathname.startsWith('/api/auth')
      const isOnAPIRoutes = nextUrl.pathname.startsWith('/api')
      const isOnPrivatePages = nextUrl.pathname.startsWith('/app')
      const isOnPublicPages = !isOnPrivatePages

      if (isOnWebhooks || isOnPublicAPIRoutes) {
        return true
      }

      if (!isOnPublicPages && !isOnAPIRoutes && isLoggedIn) {
        return Response.redirect(new URL('/app', nextUrl))
      }

      if (isOnAPIRoutes && !isLoggedIn) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 })
      }

      if (isOnPrivatePages && !isLoggedIn) {
        return false
      }

      return true
    },
  },
} satisfies NextAuthConfig
