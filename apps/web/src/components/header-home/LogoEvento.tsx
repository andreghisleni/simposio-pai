'use client'

import Image from 'next/image'

import LogoLight from '@/assets/Cabeçalho-Branco-Site.png'
import LogoDark from '@/assets/logo-dark.png'
import { cn } from '@/lib/utils'

export function LogoEvento() {
  return (
    <div className={cn('w-screen md:max-w-3xl lg:max-w-2xl', 'dark:w-96')}>
      <Image
        src={LogoLight}
        alt="Logo"
        placeholder="blur"
        className="block scale-100 transition-all dark:hidden dark:scale-0"
      />
      <Image
        src={LogoDark}
        alt="Logo"
        placeholder="blur"
        className="hidden scale-0 transition-all dark:block dark:scale-100"
      />
    </div>
  )
}
