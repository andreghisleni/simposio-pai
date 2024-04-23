'use client'

import { RouterOutput } from '@simposio-pai/trpc'
import React from 'react'

import ScheduleSwitcher from './ScheduleSwitcher'

export function Header({
  schedules,
}: {
  schedules: RouterOutput['getSchedules']['schedules']
}) {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Agenda
        </h1>

        <ScheduleSwitcher schedules={schedules} />
      </div>
    </>
  )
}
