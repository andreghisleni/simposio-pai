import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'
import { Button } from '@/components/ui/button'
import { serverClient } from '@/lib/trpc/server'

export const metadata: Metadata = {
  title: 'Inscrição realizada com sucesso!',
}

export default async function SubscribeSuccess({
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
    <Section>
      <Container className="max-w-lg space-y-8 text-center">
        <h1 className="text-3xl font-bold text-primary">
          Olá {enrolled.name}, inscrição realizada com sucesso!
        </h1>
        <h2 className="text-xl">
          Caso não queira submeter um trabalho ou astrofotografia neste momento,
          agradecemos por sua inscrição. Um link para a área do inscrito foi
          enviado para seu e-mail, caso necessite acessá-la posteriormente.
        </h2>

        <h2 className="text-xl">
          Caso queira submeter um trabalho ou astrofotografia neste momento,
          clique abaixo.
        </h2>

        <div className="flex justify-between gap-4">
          <Button
            className="bg-primary hover:bg-primary/75 dark:bg-primary dark:text-white dark:hover:bg-primary/75"
            asChild
          >
            <Link href={`/subscribe/${enrolledId}/submit-work`}>
              Submeter Trabalho
            </Link>
          </Button>
          <Button
            className="bg-primary hover:bg-primary/75 dark:bg-primary dark:text-white dark:hover:bg-primary/75"
            asChild
          >
            <Link href={`/subscribe/${enrolledId}/astrophoto`}>
              Submeter Astrofotografia
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
