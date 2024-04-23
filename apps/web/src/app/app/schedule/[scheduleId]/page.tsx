import { unstable_noStore } from 'next/cache'
import { redirect } from 'next/navigation'

import { serverClient } from '@/lib/trpc/server'

import { Calendar } from '../calendar/calendar'

export default async function CalendarPage({
  params: { scheduleId },
}: {
  params: { scheduleId: string }
}) {
  unstable_noStore()

  const { schedule } = await serverClient.getSchedule({
    id: scheduleId,
  })

  if (!schedule) redirect('/settings/schedule')

  return (
    <div>
      {/* <h1>Calender</h1> */}

      <Calendar schedule={schedule} />
    </div>
  )
}
