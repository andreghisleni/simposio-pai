'use client'

import FullCalendar from '@fullcalendar/react'
import { RouterOutput } from '@simposio-pai/trpc'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { trpc } from '@/lib/trpc/react'
import { cn } from '@/lib/utils'

import { Event } from './types'
const FullCalendarWrapper = lazy(() => import('./full-calendar'))

type View =
  | 'dayGridMonth'
  | 'timeGridWeek'
  | 'timeGridDay'
  | 'listMonth'
  | 'listDay'
  | 'listWeek'

type CalendarProps = {
  onClickEvent?: (event: Event) => void
  schedule: RouterOutput['getSchedule']['schedule']
}

export const Calendar: React.FC<CalendarProps> = ({
  onClickEvent,
  schedule,
}) => {
  const [calendarView, setCalendarView] = useState<View>('dayGridMonth')
  const calendarRef = useRef<FullCalendar>(null)
  const [title, setTitle] = useState(calendarRef.current?.getApi().view.title)
  const { isAboveMd } = useBreakpoint('md')

  useEffect(() => {
    calendarRef.current?.getApi().changeView(calendarView)
  }, [calendarView])

  useEffect(() => {
    if (isAboveMd) {
      setCalendarView('dayGridMonth')
    } else {
      setCalendarView('listMonth')
    }
  }, [isAboveMd])

  const { data, refetch } = trpc.getSchedule.useQuery({
    id: schedule.id,
  })

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            onClick={() => {
              calendarRef.current?.getApi().prev()
            }}
            variant="outline"
            format="rounded"
          >
            <ArrowLeft />
          </Button>

          <Button
            onClick={() => {
              calendarRef.current?.getApi().next()
            }}
            variant="outline"
            format="rounded"
          >
            <ArrowRight />
          </Button>
          <span className="flex self-center">{title}</span>
        </div>

        <RadioGroup value={calendarView} className="flex gap-0">
          {[
            {
              label: 'Month',
              desktopView: 'dayGridMonth',
              mobileView: 'listMonth',
            },
            {
              label: 'Week',
              desktopView: 'timeGridWeek',
              mobileView: 'listWeek',
            },
            {
              label: 'Day',
              desktopView: 'timeGridDay',
              mobileView: 'listDay',
            },
          ].map(({ label, desktopView, mobileView }) => {
            const view = isAboveMd ? desktopView : mobileView
            return (
              <div key={view}>
                <RadioGroupItem
                  value={view}
                  id={view}
                  onClick={() => {
                    setCalendarView(view as View)
                  }}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  className={cn(
                    calendarView === view &&
                      'border-teal-400 text-teal-400 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-300',
                    'cursor-pointer',
                  )}
                  asChild
                >
                  <Label htmlFor={view}>{label}</Label>
                </Button>
              </div>
            )
          })}
          {isAboveMd && (
            <div>
              <RadioGroupItem
                value="listMonth"
                onClick={() => {
                  setCalendarView('listMonth')
                }}
                id="listMonth"
                className="hidden"
              />
              <Button
                variant="outline"
                className={cn(
                  calendarView === 'listMonth' &&
                    'border-teal-400 text-teal-400 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-300',
                  'cursor-pointer',
                )}
                asChild
              >
                <Label htmlFor="listMonth">List</Label>
              </Button>
            </div>
          )}
        </RadioGroup>
      </div>
      <Suspense>
        <FullCalendarWrapper
          {...{
            calendarRef,
            events: [],
            onClickEvent,
            setTitle,
            schedule: data?.schedule || schedule,
            refetch,
          }}
        />
      </Suspense>
    </div>
  )
}
