'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { trpc } from '@/lib/trpc/react'

import { ClientFullForm } from './client-full-form'

interface ClientFullFormDialogProps {
  refetch: () => void
}

export function ClientFullFormEdit({ refetch }: ClientFullFormDialogProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const clientId = searchParams.get('clientId')

  const [isOpen, setIsOpen] = useState(!!clientId)

  function handleClose() {
    setIsOpen(false)
    router.push('/clients')
  }

  if (!clientId) return null

  const { data } = trpc.getClient.useQuery({ id: clientId })

  const client = data?.client

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>{client ? 'Editar' : 'Cadastrar'}</DialogTitle>
        </DialogHeader>

        <ClientFullForm
          {...{
            refetch,
            isOpen,
            setIsOpen: handleClose,
            client,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
