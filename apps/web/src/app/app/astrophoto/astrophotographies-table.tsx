'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { Astrophotographies, columns } from './columns'

type IProps = {
  astrophotographies: Astrophotographies[]
}

export const AstrophotographiesTable: React.FC<IProps> = ({
  astrophotographies,
}) => {
  const { data } = trpc.getAstrophotographies.useQuery()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Astro fotografias inscritas</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns()}
          data={data?.astrophotographies || astrophotographies}
        />
      </CardContent>
    </Card>
  )
}
