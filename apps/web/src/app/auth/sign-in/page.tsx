// import { env } from '@simposio-pai/env'
import { Metadata } from 'next'
import Image from 'next/image'

import GClinicLogo from '@/assets/simposio-pai-logo.svg'

import { SignInForm } from './credentials/sign-in/sign-in-form'

// import { signInWithGithub } from './actions'
// import { SignInForm } from './credentials/sign-in-form'
// import { SignInWithGoogleButton } from './sign-in-with-google-button'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-8">
          <Image
            src={GClinicLogo}
            alt="gl"
            className="h-12"
            width={157.49}
            height={48}
          />

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              simposio-pai
            </h1>
          </div>
        </div>
        <div>
          <SignInForm />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="text-sm text-gray-500">
            Don`t have an account?{' '}
            <a href="/auth/register" className="text-blue-500">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
