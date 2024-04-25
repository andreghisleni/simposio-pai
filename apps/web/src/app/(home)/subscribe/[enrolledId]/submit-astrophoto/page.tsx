import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

// import { serverClient } from '@/lib/trpc/server'
import { AstroPhotographyForm } from './submit-astro-photography-form'

export const metadata: Metadata = {
  title: 'Submeter Astrofotografia',
}

export default async function SubmitWork({
  params: { enrolledId },
}: {
  params: {
    enrolledId: string
  }
}) {
  unstable_noStore()

  // const { enrolled } = await serverClient.getEnrolled({
  //   id: enrolledId,
  // })

  return (
    <div className="flex h-full min-h-screen w-full justify-center">
      <AstroPhotographyForm
        {...{
          enrolledId,
        }}
      />
    </div>
  )
}
