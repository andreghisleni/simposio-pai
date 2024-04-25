import { Metadata } from 'next'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'

export const metadata: Metadata = {
  title: 'Subscribe',
}

export default function PresentationPage() {
  return (
    <Section variant="callaction">
      <Container className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-primary">Contato</h1>
        <h3 className="text-2xl font-semibold">
          E-mail:{' '}
          <a
            href="mailto:espacoastronomia@gmail.com"
            className="text-primary hover:text-primary/60"
          >
            espacoastronomia@gmail.com
          </a>
        </h3>
      </Container>
    </Section>
  )
}
