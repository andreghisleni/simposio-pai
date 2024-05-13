'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { columns, Work } from './columns'

type IProps = {
  works: Work[]
}

export const WorksTable: React.FC<IProps> = ({ works }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trabalhos submetidos</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={works}
          // addComponent={<ScheduleTypeForm refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
