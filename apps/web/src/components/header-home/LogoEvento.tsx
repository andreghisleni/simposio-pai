'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

import LogoDark from '@/assets/logo-dark.png'
import LogoLight from '@/assets/logo-light.png'

export function LogoEvento() {
  const { theme } = useTheme()

  const Logo = theme === 'light' ? LogoLight : LogoDark

  console.log(Logo)

  return (
    <div className="w-96">
      <Image src={Logo} alt="Logo" placeholder="blur" layout="responsive" />
    </div>
  )
}
