'use client'

import { RouterOutput } from '@simposio-pai/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Work = RouterOutput['getEnrolled']['enrolled']['works'][0]

export const columns: ColumnDef<Work>[] = [
  {
    accessorKey: 'title',
    header: tableDataButton('Titulo'),
  },
  {
    accessorKey: 'presentersName',
    header: tableDataButton('Nome do apresentador'),
  },
  {
    accessorKey: 'presentersInstitute',
    header: tableDataButton('Instituição do apresentador'),
  },
  {
    accessorKey: 'authorsNames',
    header: tableDataButton('Nomes dos autores'),
    cell: ({ row }) => {
      return (
        <span>{(row.getValue('authorsNames') as string[]).join(', ')}</span>
      )
    },
  },
  {
    accessorKey: 'abstract',
    header: tableDataButton('Resumo'),
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Resumo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Resumo</DialogTitle>
            </DialogHeader>
            <p>{row.getValue('abstract')}</p>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({ row }) => {
      return (
        <span>
          {format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm')}
        </span>
      )
    },
  },
]
