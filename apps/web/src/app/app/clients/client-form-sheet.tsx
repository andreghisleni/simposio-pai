'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { ClientForm } from './client-form'
import { Client } from './columns'

export function ClientFormSheet({
  refetch,
  client,
}: {
  refetch: (client?: Client) => void
  client?: Client
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{client ? 'Editar' : 'Adicionar'}</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{client ? 'Editar' : 'Cadastrar'} paciente</SheetTitle>
          <SheetDescription>
            {client ? 'Editar' : 'Cadastrar'} paciente
          </SheetDescription>
        </SheetHeader>
        <ClientForm
          {...{
            refetch,
            client,
            isOpen,
            setIsOpen,
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
