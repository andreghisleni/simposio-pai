'use client'

import { ReactNode } from 'react'

import { ClientsProvider } from '@/hooks/clients.hook'

export function Providers({ children }: { children: ReactNode }) {
  return <ClientsProvider>{children}</ClientsProvider>
}
