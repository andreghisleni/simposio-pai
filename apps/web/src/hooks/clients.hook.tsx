'use client'

import { RouterOutput } from '@simposio-pai/trpc'
import React, { createContext, useContext } from 'react'

import { trpc } from '@/lib/trpc/react'

export type Client = RouterOutput['getClients']['clients'][0]

interface ClientsContextData {
  clients: Client[]
  isLoading: boolean
  refetch: () => void
}
export const ClientsContext = createContext<ClientsContextData>(
  {} as ClientsContextData,
)

export const useClients = (): ClientsContextData => {
  const context = useContext(ClientsContext)

  if (!context) {
    throw new Error('useClients must be used within a ClientsProvider')
  }
  return context
}

interface ClientsProviderProps {
  children: React.ReactNode
}

export function ClientsProvider({ children }: ClientsProviderProps) {
  const { data, isLoading, refetch } = trpc.getClients.useQuery({})

  return (
    <ClientsContext.Provider
      value={{
        clients: data?.clients || [],
        isLoading,
        refetch,
      }}
    >
      {children}
    </ClientsContext.Provider>
  )
}
