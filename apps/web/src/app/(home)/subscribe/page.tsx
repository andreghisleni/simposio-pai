import { Metadata } from 'next'

import { SubscribeForm } from './subscribe-form'

export const metadata: Metadata = {
  title: 'Subscribe',
}

export default function Subscribe() {
  return (
    <div className="flex h-full min-h-screen w-full justify-center">
      <SubscribeForm />
    </div>
  )
}
