import { Metadata } from 'next'

import { serverClient } from '@/lib/trpc/server'

import { SubscribeForm } from './subscribe-form'

export const metadata: Metadata = {
  title: 'Subscribe',
}

export default async function Subscribe() {
  const totalEnrolleds = await serverClient.totalEnrolleds()

  if (totalEnrolleds.totalEnrolleds > 100) {
    return (
      <div className="flex h-full min-h-screen w-full justify-center">
        <h1 className="text-4xl">Sorry, we are full!</h1>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-screen w-full justify-center">
      <SubscribeForm />
    </div>
  )
}
