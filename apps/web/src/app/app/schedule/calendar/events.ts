import { Event } from './types'

const todayStr = new Date().toISOString().replace(/T.*$/, '')

export const data = [
  {
    id: crypto.randomUUID(),
    title: 'Event 1',
    color: 'red',
    description: 'Event 1 description',
    startDate: new Date(todayStr + 'T10:00:00'),
    endDate: new Date(todayStr + 'T11:00:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Event 2',
    color: 'blue',
    description: 'Event 2 description',
    startDate: new Date(todayStr + 'T12:00:00'),
    endDate: new Date(todayStr + 'T13:00:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Event 3',
    color: 'green',
    description: 'Event 3 description',
    startDate: new Date(todayStr + 'T14:00:00'),
    endDate: new Date(todayStr + 'T15:00:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Event 4',
    color: 'yellow',
    description: 'Event 4 description',
    startDate: new Date(todayStr + 'T16:00:00'),
    endDate: new Date(todayStr + 'T17:00:00'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as Event[]
