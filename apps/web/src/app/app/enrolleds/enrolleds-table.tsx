'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, Enrolled } from './columns'

type IProps = {
  enrolleds: Enrolled[]
}

export const EnrolledsTable: React.FC<IProps> = ({ enrolleds }) => {
  const { data } = trpc.getEnrolleds.useQuery({})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inscrições</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns()} data={data?.enrolleds || enrolleds} />
      </CardContent>
    </Card>
  )
}
