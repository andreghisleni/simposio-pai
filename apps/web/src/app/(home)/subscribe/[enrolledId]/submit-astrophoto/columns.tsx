'use client'

import { RouterOutput } from '@simposio-pai/trpc'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

import { FileViewer } from '@/components/file-viewer'
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
export type Astrophotography =
  RouterOutput['getEnrolled']['enrolled']['astrophotographies'][0]

export const columns: ColumnDef<Astrophotography>[] = [
  {
    accessorKey: 'title',
    header: tableDataButton('Titulo'),
  },
  {
    id: 'photo',
    enableHiding: false,

    cell: ({ row }) => {
      const { id, title, photo } = row.original

      if (!photo)
        return (
          <Button variant="outline" disabled>
            Não há arquivo
          </Button>
        )

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Arquivo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Arquivo: {title} sem marca d`água</DialogTitle>
            </DialogHeader>
            <div className="h-[600px]">
              <FileViewer
                url={`/astrophotographies/download/${id}/photo`}
                file_name={photo}
                name={title}
              />
            </div>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    id: 'photoWithWatermark',
    enableHiding: false,

    cell: ({ row }) => {
      const { id, title, photoWithWatermark } = row.original

      if (!photoWithWatermark)
        return (
          <Button variant="outline" disabled>
            Não há arquivo
          </Button>
        )

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Arquivo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Arquivo: {title} com marca d`água</DialogTitle>
            </DialogHeader>
            <div className="h-[600px]">
              <FileViewer
                url={`/astrophotographies/download/${id}/photoWithWatermark`}
                file_name={photoWithWatermark}
                name={title}
              />
            </div>
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
