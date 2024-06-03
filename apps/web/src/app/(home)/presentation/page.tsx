import { Metadata } from 'next'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'

export const metadata: Metadata = {
  title: 'Apresentação',
}

export default function PresentationPage() {
  return (
    <Section variant="callaction">
      <Container className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-primary">Apresentação</h1>
        <p>
          A Associação Apontador de Estrelas, em parceria com a Universidade do
          Estado de Santa Catarina - UDESC Oeste, o Instituto Federal de Santa
          Catarina - IFSC, campi Chapecó e Xanxerê, a Universidade Federal da
          Fronteira Sul – UFFS, campus Chapecó, e EEB Bom Pastor, realizarão,
          nos dias 19 e 20 de julho de 2024, em Chapecó - SC, o 11º Simpósio
          Catarinense de Astronomia.
        </p>

        <p>
          O evento tem como objetivos propiciar o encontro dos astrônomos
          catarinenses, sejam amadores ou profissionais, integrar as associações
          de astronomia de Santa Catarina, destacar observações, pesquisas e
          atividades astronômicas realizadas no estado, além de divulgar as
          iniciativas de ensino de astronomia nas redes públicas de educação
          catarinenses.
        </p>

        <p>
          São convidados astrônomos amadores e profissionais, professores e
          estudantes da educação básica e ensino superior, e todos aqueles que
          possuem interesse em entender melhor esta bela ciência, que é a
          astronomia.
        </p>

        <p>
          No 11º Simpósio Catarinense de Astronomia teremos palestrantes
          convidados, apresentação de trabalhos nas formas oral e visual, mesa
          redonda, noite de observação do céu com o telescópio e práticas de
          astrofotografia.
        </p>

        <p>
          As inscrições para apresentação oral e visual de trabalhos
          desenvolvidos nos grupos de astronomia, universidades e por astrônomos
          que atuam individualmente estão abertas. Receberemos propostas de
          trabalhos para serem apresentados até o dia{' '}
          <span className="font-bold">31 de maio</span>.
        </p>

        <p>
          Durante o evento realizaremos a Exposição Catarinense de
          Astrofotografia. A submissão de astrofotografias encerra também no dia{' '}
          <span className="font-bold">31 de maio</span>.
        </p>

        <p>
          As inscrições para participação sem apresentação de trabalhos vão até
          o dia <s>1° de julho</s>
          <span className="font-bold"> 31 de maio</span>.
        </p>

        <p>
          O evento será certificado pela UDESC, Universidade do Estado de Santa
          Catarina, através do seu campus Oeste. Resumos expandidos dos
          trabalhos apresentados serão também publicados.
        </p>
      </Container>
    </Section>
  )
}
