// import { env } from '@simposio-pai/env'
import { Metadata } from 'next'

import { RegisterForm } from './register-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              simposio-pai
            </h1>
          </div>
        </div>
        <div>
          <RegisterForm />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/auth/sign-in" className="text-blue-500">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
