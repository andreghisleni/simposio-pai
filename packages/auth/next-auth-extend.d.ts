import type { AdapterUser as AdapterUserBase } from '@auth/core/adapters'
import type { DefaultSession, User as DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

declare module '@auth/core/adapters' {
  export interface AdapterUser extends AdapterUserBase {
    // clinicId: string | null
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    // clinicId: string | null
  }

  export interface Session extends DefaultSession {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    // clinicId: string | null
  }
}
