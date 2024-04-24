import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { SubmitWorkForm } from './submit-work-form'

export const metadata: Metadata = {
  title: 'Submeter Trabalho',
}

export default async function SubmitWork({
  params: { enrolledId },
}: {
  params: {
    enrolledId: string
  }
}) {
  unstable_noStore()

  const { enrolled } = await serverClient.getEnrolled({
    id: enrolledId,
  })

  return (
    <div className="flex h-full min-h-screen w-full justify-center">
      <SubmitWorkForm
        {...{
          enrolledId,
          name: enrolled.name,
          institute: enrolled.institute,
        }}
      />
    </div>
  )
}
