import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { ScheduleDaysTable } from './schedule-day-table'

export const metadata: Metadata = {
  title: 'Schedule open days settings',
}

export default async function SchedulePage({
  params: { scheduleId },
}: {
  params: { scheduleId: string }
}) {
  unstable_noStore()

  const { scheduleDays } = await serverClient.getScheduleDays({
    scheduleId,
  })

  return (
    <ScheduleDaysTable scheduleDays={scheduleDays} scheduleId={scheduleId} />
  )
}
