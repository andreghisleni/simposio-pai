import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { AstrophotographiesTable } from './astrophotographies-table'

export const metadata: Metadata = {
  title: 'Inscrições',
}

export default async function AstrophotographiesPage() {
  unstable_noStore()

  const { astrophotographies } = await serverClient.getAstrophotographies()

  return <AstrophotographiesTable astrophotographies={astrophotographies} />
}
