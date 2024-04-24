import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { Toaster as T2 } from '@/components/ui/toaster'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    template: '%s | XI Simpósio Catarinense de Astronomia',
    absolute: 'XI Simpósio Catarinense de Astronomia',
  },
  description:
    'O 11º Simpósio Catarinense de Astronomia, em Chapecó nos dias 19 e 20 de julho de 2024, reúne astrônomos amadores e profissionais, professores, estudantes e entusiastas para compartilhar pesquisas, observações e práticas de ensino, incluindo palestras, exposição de astrofotografias e oportunidades de certificação.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}

          <Toaster />
          <T2 />
        </Providers>
      </body>
    </html>
  )
}
