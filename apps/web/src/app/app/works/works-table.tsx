'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, Work } from './columns'

type IProps = {
  works: Work[]
}

export const WorksTable: React.FC<IProps> = ({ works }) => {
  const { data } = trpc.getWorks.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trabalhos inscritos</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns()} data={data?.works || works} />
      </CardContent>
    </Card>
  )
}
