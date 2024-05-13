'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Astrophotography, columns } from './columns'

type IProps = {
  astrophotographies: Astrophotography[]
}

export const AstroPhotographiesTable: React.FC<IProps> = ({
  astrophotographies,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Astrofotografias submetidas</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={astrophotographies}
          // addComponent={<ScheduleTypeForm refetch={refetch} />}
        />
      </CardContent>
    </Card>
  )
}
