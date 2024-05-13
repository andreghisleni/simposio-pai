'use client'

import { RouterOutput } from '@simposio-pai/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

import { tableDataButton } from '@/components/TableDataButton'
import { Button } from '@/components/ui/button'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Enrolled = RouterOutput['getEnrolleds']['enrolleds'][0]

export const columns = (): ColumnDef<Enrolled>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome'),
  },
  {
    accessorKey: 'email',
    header: tableDataButton('E-mail'),
  },
  {
    accessorKey: 'document',
    header: tableDataButton('Documento'),
  },
  {
    accessorKey: 'birthDate',
    header: tableDataButton('Data de nascimento'),
    cell: ({ getValue }) => {
      return (
        <span>
          {getValue()
            ? format(new Date(getValue<string>()), 'dd/MM/yyyy')
            : '-'}
        </span>
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
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => (
      <Button variant="outline" asChild>
        <Link href={`/app/enrolleds/${row.original.id}`}>Ver inscrição</Link>
      </Button>
    ),
  },
]
