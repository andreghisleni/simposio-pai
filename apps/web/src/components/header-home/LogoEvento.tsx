'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

const LogoLight = '@/assets/logo-light.jpeg'
const LogoDark = '@/assets/logo-dark.jpeg'

export function LogoEvento() {
  const { theme } = useTheme()

  const Logo = theme === 'light' ? LogoLight : LogoDark

  console.log(Logo)

  return (
    <div className="h-12">
      {/* <Image
        src={Logo}
        alt="Logo"
        // width={85.33}
        // height={48}
        placeholder="blur"
        fill={true}
        layout="responsive"
      /> */}
    </div>
  )
}
