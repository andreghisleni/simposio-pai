'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { ClientFullFormDialog } from './client-full-form-dialog'
import { ClientFullFormEdit } from './client-full-form-edit'
import { Client, columns } from './columns'

type IProps = {
  clients: Client[]
}

export function ClientsTable({ clients }: IProps) {
  const { data, refetch } = trpc.getClients.useQuery({})
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pacientes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns({ refetch })}
            data={data?.clients || clients}
            addComponent={
              <>
                {/* <ClientFormSheet
                refetch={(data?: Client) => {
                  console.log(data)
                  refetch()
                }}
              /> */}
                <ClientFullFormDialog refetch={refetch} />
              </>
            }
          />
        </CardContent>
      </Card>
      <ClientFullFormEdit refetch={refetch} />
    </>
  )
}
