import { ArrowLeft } from 'lucide-react'
import { unstable_noStore } from 'next/cache'

import { Container } from '@/components/my-ui/container'
import { NavLink } from '@/components/nav-link'
import { serverClient } from '@/lib/trpc/server'

export default async function EnrolledLayout({
  children,
  params: { enrolledId },
}: {
  children: React.ReactNode
  params: {
    enrolledId: string
  }
}) {
  unstable_noStore()

  const { enrolled } = await serverClient.getEnrolled({
    id: enrolledId,
  })
  return (
    <div>
      <Container className="flex justify-center text-center">
        <NavLink
          className="flex items-center border-b-2 border-transparent px-3 py-1.5 text-sm font-medium uppercase text-muted-foreground transition-colors"
          href={`/subscribe/${enrolledId}`}
        >
          <ArrowLeft /> Home do inscrito
        </NavLink>
        <p className="text-lg font-bold">
          Olá {enrolled.name}, esta é a área do inscrito!
        </p>
      </Container>
      {children}
    </div>
  )
}
