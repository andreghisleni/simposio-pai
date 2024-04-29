import { Metadata } from 'next'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'

export const metadata: Metadata = {
  title: 'Programação',
}

export default function PresentationPage() {
  return (
    <Section variant="callaction">
      <Container className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-primary">Programação</h1>
        <p>Logo logo vai sair do forno...</p>
      </Container>
    </Section>
  )
}
