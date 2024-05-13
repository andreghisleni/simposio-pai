import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { EnrolledsTable } from './enrolleds-table'

export const metadata: Metadata = {
  title: 'Inscrições',
}

export default async function EnrolledsPage() {
  unstable_noStore()

  const { enrolleds } = await serverClient.getEnrolleds({})

  return <EnrolledsTable enrolleds={enrolleds} />
}
