'use client'

import React from 'react'

import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc/react'

import { columns, ScheduleDay } from './columns'
import { ScheduleDayForm } from './schedule-day-form'

type IProps = {
  scheduleDays: ScheduleDay[]
  scheduleId: string
}

export const ScheduleDaysTable: React.FC<IProps> = ({
  scheduleDays,
  scheduleId,
}) => {
  const { data, refetch } = trpc.getScheduleDays.useQuery({
    scheduleId,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dias abertos</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch, scheduleId })}
          data={data?.scheduleDays || scheduleDays}
          addComponent={
            <ScheduleDayForm refetch={refetch} scheduleId={scheduleId} />
          }
        />
      </CardContent>
    </Card>
  )
}
