'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ClientFullForm } from './client-full-form'
import { Client } from './columns'

interface ClientFullFormDialogProps {
  refetch: () => void
  client?: Client
  disabled?: boolean
}

export function ClientFullFormDialog({
  refetch,
  client,
  disabled,
}: ClientFullFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {client ? (disabled ? 'Visualizar' : 'Editar') : 'Adicionar'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl">
        <DialogHeader>
          <DialogTitle>
            {client ? (disabled ? 'Visualizar' : 'Editar') : 'Cadastrar'}
          </DialogTitle>
        </DialogHeader>

        <ClientFullForm
          {...{
            refetch,
            isOpen,
            setIsOpen,
            client,
            disabled,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
