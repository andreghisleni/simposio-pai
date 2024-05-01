import { Metadata } from 'next'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'

export const metadata: Metadata = {
  title: 'Normas Astrofotografia',
}

export default function AstrophotographyStandardsPage() {
  return (
    <Section variant="callaction">
      <Container className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-primary">
          Normas Astrofotografia
        </h1>
        <p>Logo logo vai sair do forno...</p>
      </Container>
    </Section>
  )
}
