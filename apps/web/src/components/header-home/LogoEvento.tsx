'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

import LogoLight from '@/assets/Cabeçalho-Branco-Site.png'
import LogoDark from '@/assets/logo-dark.png'
import { cn } from '@/lib/utils'

export function LogoEvento() {
  const { theme } = useTheme()

  const Logo = theme === 'light' ? LogoLight : LogoDark

  console.log(Logo)

  return (
    <div
      className={cn(
        theme === 'light' ? 'w-screen md:max-w-3xl lg:max-w-2xl' : 'w-96',
      )}
    >
      {theme}
      <Image src={Logo} alt="Logo" placeholder="blur" layout="responsive" />
    </div>
  )
}
