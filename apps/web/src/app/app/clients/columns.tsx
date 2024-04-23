'use client'

import { RouterOutput } from '@simposio-pai/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { tableDataButton } from '@/components/TableDataButton'
import { inputCpfMask, inputPhoneMask } from '@/utils/inputMasks'

import { ClientFullFormDialog } from './client-full-form-dialog'

export type Client = RouterOutput['getClients']['clients'][0]

type ColumnsProps = {
  refetch: () => void
}

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Client>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome'),
  },
  {
    accessorKey: 'cpf',
    header: tableDataButton('CPF'),
    cell: ({ row }) => {
      return <span>{inputCpfMask(row.getValue('cpf')) || '---'}</span>
    },
  },
  {
    accessorKey: 'phone',
    header: tableDataButton('Telefone'),
    cell: ({ row }) => {
      return <span>{inputPhoneMask(row.getValue('phone')) || '---'}</span>
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
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <ClientFullFormDialog client={row.original} refetch={refetch} />
          <ClientFullFormDialog
            client={row.original}
            refetch={refetch}
            disabled
          />

          {/* <EditButton clientId={row.original.id} /> */}
        </div>
      )
    },
  },
]
