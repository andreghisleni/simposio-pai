import './calendar.css'

import { DateSelectArg, EventSourceInput } from '@fullcalendar/core'
import { EventImpl } from '@fullcalendar/core/internal'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { RouterOutput } from '@simposio-pai/trpc'
import { Dispatch, RefObject, SetStateAction, useState } from 'react'

import { StatusColors } from '@/utils/statusColors'

import { ScheduleItemFormDialog } from './schedule-item-form-dialog'
import { ScheduleItemFormSheet } from './schedule-item-form-sheet'
// import { customPlugin } from './customPlugin'
import { Event } from './types'

type UnlockedDayTime = {
  day: string
  times: string[]
}

const allTimes = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]

function getWeekTimes(unlockedDayTimes: UnlockedDayTime[]) {
  const weekTimes = {
    start: '23:59',
    end: '00:00',
  }

  unlockedDayTimes.forEach(({ times }) => {
    times.sort()
    const [firstTime] = times
    const lastTime = times[times.length - 1]

    if (firstTime < weekTimes.start) {
      weekTimes.start = firstTime
    }

    if (lastTime > weekTimes.end) {
      weekTimes.end = lastTime
    }
  })

  return weekTimes
}

const dateInArray = (date: Date, array: Date[]) =>
  array.some((d) => +d === +date)

// start of the component -----------------------------------------------------------------------------------

type FullCalendarWrapperProps = {
  calendarRef: RefObject<FullCalendar>
  onClickEvent?: (event: Event) => void
  setTitle: Dispatch<SetStateAction<string | undefined>>
  schedule: RouterOutput['getSchedule']['schedule']
  refetch: () => void
}

export default function FullCalendarWrapper({
  calendarRef,
  // onClickEvent,
  setTitle,
  schedule,
  refetch,
}: FullCalendarWrapperProps) {
  const [newEvent, setNewEvent] = useState<DateSelectArg>()
  const [editEvent, setEditEvent] = useState<EventImpl | undefined>()

  let events

  if (schedule.scheduleDays.length === 0) {
    events = [
      {
        id: crypto.randomUUID(),
        groupId: 'lock',
        start: new Date(),
        allDay: true,
        display: 'inverse-background',
        color: 'rgba(255, 4, 4, 0.945)',
      },
      {
        id: crypto.randomUUID(),
        groupId: 'lock',
        start: new Date(),
        allDay: true,
        display: 'background',
        color: 'rgba(255, 4, 4, 0.945)',
      },
    ]
  }

  const unlockedDayTimes: UnlockedDayTime[] = schedule.scheduleDays.map(
    ({ day, times }) => ({
      day: new Date(day).toISOString().split('T')[0],
      times,
    }),
  )

  const allDayTimes = unlockedDayTimes.flatMap(({ day, times }) => {
    return times.map((time) => {
      const [hour, minute] = time.split(':')
      const [year, month, d] = day.split('-')
      const date = new Date(day)
      date.setFullYear(Number(year), Number(month) - 1, Number(d))
      date.setHours(Number(hour), Number(minute))

      return date
    })
  })

  const unlockedDays = unlockedDayTimes.map(({ day }) => day)

  const lockDay = unlockedDays.map((d) => {
    const [year, month, day] = d.split('-')
    const date = new Date(d)
    date.setFullYear(Number(year), Number(month) - 1, Number(day))

    return {
      id: crypto.randomUUID(),
      groupId: 'lock',
      start: date,
      allDay: true,
      display: 'inverse-background',
      color: 'rgba(255, 4, 4, 0.945)',
    }
  })

  const weekTimes = getWeekTimes(unlockedDayTimes)

  const lockTimes = unlockedDayTimes.flatMap(({ day, times }) => {
    times.sort()
    const uniqueTimes = allTimes.filter((time) => !times.includes(time))

    return uniqueTimes.map((time) => {
      const [hour, minute] = time.split(':')
      const [year, month, d] = day.split('-')
      const date = new Date(day)
      date.setFullYear(Number(year), Number(month) - 1, Number(d))
      date.setHours(Number(hour), Number(minute))

      return {
        id: crypto.randomUUID(),
        groupId: 'lock',
        start: date,
        allDay: false,
        display: 'background',
        color: 'rgba(255, 4, 4, 0.945)',
      }
    })
  })

  const scheduleEvents = schedule.scheduleItens.map((item) => ({
    id: item.id,
    title: item.client.name,
    color: StatusColors[item.status],
    description: item.client.phone,
    start: item.startAt,
    end: item.endAt,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

  const e: EventSourceInput = [
    ...(events || []),
    ...scheduleEvents,
    ...lockDay,
    ...lockTimes,
  ]

  function handleDateSelect(selectInfo: DateSelectArg) {
    // const title = prompt('Please enter a new title for your event')

    // console.log('selectInfo', selectInfo)

    setNewEvent(selectInfo)

    // if (title) {
    //   calendarApi.addEvent({
    //     id: crypto.randomUUID(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     // allDay: selectInfo.allDay,
    //   })
    // }
  }

  return (
    <>
      {/* <pre>
        {JSON.stringify(
          {
            unlockedDayTimes,
            lockDay,
            lockTimes,
          },
          null,
          2,
        )}
      </pre> */}
      <FullCalendar
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          // customPlugin,
        ]}
        initialView={'dayGridMonth'}
        // initialView="custom"
        events={e}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
        eventClick={({ event }) => {
          if (event.display === 'inverse-background') {
            return
          }
          if (event.display === 'background') {
            return
          }

          console.log('event', event)
          setEditEvent(event)
          console.log(
            schedule.scheduleItens.find((item) => item.id === event?.id),
          )
        }}
        datesSet={({ view }) => {
          setTitle(view.title)
        }}
        headerToolbar={false}
        // timeZone="UTC-3"
        locale={'pt-BR'}
        allDaySlot={false}
        height={600}
        slotMinTime={weekTimes.start}
        slotMaxTime={weekTimes.end}
        selectable={true}
        selectMirror={true}
        select={(selectInfo) => {
          console.log('selectInfo', selectInfo)
          handleDateSelect(selectInfo)
        }}
        selectOverlap={(event) => {
          if (event.display === 'inverse-background') {
            return true
          }
          return false
        }}
        selectAllow={({ start }) => {
          const startWithoutMinutes = new Date(start)
          startWithoutMinutes.setMinutes(0)

          return dateInArray(startWithoutMinutes, allDayTimes)
        }}
        dateClick={(dateClickInfo) => {
          if (dateClickInfo.view.type === 'dayGridMonth') {
            console.log('dateClickInfo', dateClickInfo)
          }
        }}
        // eventContent={(eventInfo) => {
        //   if (eventInfo.event.groupId !== 'lock') {
        //     return (
        //       <div>
        //         <b>{eventInfo.timeText}</b>
        //         <i>{eventInfo.event.title}</i>
        //       </div>
        //     )
        //   }
        //   return null
        // }}

        displayEventEnd={false}
      />
      <ScheduleItemFormSheet
        refetch={() => {
          console.log('refetch')
          refetch()
        }}
        scheduleId={schedule.id}
        start={newEvent?.startStr}
        isOpen={!!newEvent}
        handleClose={() => setNewEvent(undefined)}
      />
      <ScheduleItemFormDialog
        refetch={() => {
          console.log('refetch')
          refetch()
        }}
        scheduleId={schedule.id}
        start={editEvent?.startStr}
        isOpen={!!editEvent}
        scheduleItem={schedule.scheduleItens.find(
          (item) => item.id === editEvent?.id,
        )}
        handleClose={() => setEditEvent(undefined)}
      />
    </>
  )
}
