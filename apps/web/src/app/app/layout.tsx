import { Header } from '@/components/header'

import { Providers } from './providers'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Providers>{children}</Providers>
      </div>
    </div>
  )
}
