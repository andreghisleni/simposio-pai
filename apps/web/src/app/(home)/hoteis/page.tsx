import { Metadata } from 'next'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'

export const metadata: Metadata = {
  title: 'Hotéis',
}

export default function PresentationPage() {
  return (
    <Section variant="callaction">
      <Container className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-primary">
          Hotéis selecionados pela nossa equipe
        </h1>
        <iframe
          src="https://drive.google.com/file/d/1bp_8PBZnov87t5AioN7BPn7lLkB9CRGO/preview?theme=light"
          // width="640"
          // height="480"
          className="aspect-video w-full"
          allow="autoplay"
        ></iframe>
      </Container>
    </Section>
  )
}
