import { RouterOutput } from '@simposio-pai/trpc'
import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import { serverClient } from '@/lib/trpc/server'

import { Calendar } from './calendar/calendar'

export const metadata: Metadata = {
  title: `Agenda`,
}

const schedule: RouterOutput['getSchedule']['schedule'] = {
  id: crypto.randomUUID(),
  name: 'Agenda 1',
  description: 'Agenda 1 description',
  startTime: '08:00',
  endTime: '18:00',
  scheduleDays: [],
  scheduleItens: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  clinicId: crypto.randomUUID(),
}

export default async function CalendarPage() {
  console.log(schedule)
  unstable_noStore()

  const { schedules } = await serverClient.getSchedules({})

  if (!schedules) redirect('/settings/schedule')

  if (schedules.length === 1) {
    redirect(`/schedule/${schedules[0].id}`)
  }

  return (
    <div>
      <Calendar schedule={schedule} />
    </div>
  )
}
