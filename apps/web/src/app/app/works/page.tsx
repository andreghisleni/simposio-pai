import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { WorksTable } from './works-table'

export const metadata: Metadata = {
  title: 'Inscrições',
}

export default async function WorksPage() {
  unstable_noStore()

  const { works } = await serverClient.getWorks()

  return <WorksTable works={works} />
}
