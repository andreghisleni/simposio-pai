import { Metadata } from 'next'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Programação',
}

const schedule = [
  {
    title: 'Dia 19 de julho de 2024',
    times: [
      { time: '08h00', text: 'Credenciamento' },
      { time: '08h30', text: 'Abertura' },
      {
        time: '09h00',
        text: 'Palestra 1',
        description:
          '“Novos Horizontes além do Hubble: contribuições do Telescópio Espacial James Webb para a astronomia fora do visível” – Profa. Dra. Tina Andreolla (UTFPR)',
      },
      { time: '10h00', text: 'Intervalo' },
      {
        time: '10h20',
        text: 'Apresentações orais',
        description: [
          'Meteoritos: Desvendando os mistérios das rochas espaciais',
          'Projetando o Tempo: Relógio Solar no Polo Astronômico de Videira',
          'Navegação astronômica autônoma: o céu como alternativa à navegação por satélite na aviação',
          'Clube de Astronomia Estrelas Carvoeiras - Um projeto Interdisciplinar',
        ],
      },
      { time: '12h20', text: 'Informes' },
      { time: '12h30', text: 'Almoço' },
      {
        time: '14h00',
        text: 'Abertura da exposição de astrofotografias e sessão de pôsteres',
        description: [
          'Sol - acompanhamento do ciclo das manchas solares a partir de Porto União/SC e União da Vitória/PR',
          'A OBA/MOBFOG na Rede Municipal de Ensino de Chapecó para o ensino da Astronomia',
          'Parque Astronômico Albert Einstein E=mc², um universo de possibilidades',
          'Planetário Digital difundindo conhecimento científico no oeste catarinense',
          'Em Busca de Outros Mundos ações de divulgação e popularização científica sobre astronomia e astronáutica no IFSC Xanxerê',
          'O Clube da física do IFSC/Chapecó como espaço de estudo da Astronomia',
          'AcruxSchool - Astronomia Adentrando a Escola',
          'AcruxMusic - Astros do Céu como Astros do Pop',
        ],
      },
      {
        time: '15h00',
        text: 'Palestra 2',
        description:
          '“Como aglomerados de estrelas desvendam a evolução das galáxias?” – Dra. Thayse Adineia Pacheco (UFRGS)',
      },
      { time: '16h00', text: 'Foto oficial do evento e Intervalo' },
      {
        time: '16h20',
        text: 'Apresentações orais',
        description: [
          'Centenário de Seixas Netto',
          'Programa Caça Asteroides do MCTI no Ambiente Escolar',
          'De Olho No Céu de Floripa',
        ],
      },
      { time: '17h50', text: 'Informes' },
      { time: '18h00', text: 'Intervalo' },
      { time: '19h30', text: 'Atividade de observação e integração' },
    ],
  },
  {
    title: 'Dia 20 de julho de 2024',
    times: [
      { time: '08h30', text: 'Atividade cultural' },
      {
        time: '09h00',
        text: 'Palestra 3',
        description:
          '“30 anos do Grande Eclipse Catarinense” – Sr. Alexandre Amorim (NEOA-JBS) e Prof. Diego de Bastiani (SEDUC Chapecó/Associação Apontador de Estrelas)',
      },
      { time: '10h00', text: 'Foto oficial do evento e Intervalo' },
      {
        time: '10h20',
        text: 'Apresentações orais',
        description: [
          'A passagem do cometa C/2023 A3 (Tsuchinshan-ATLAS) – resultados preliminares e perspectivas para os próximos meses',
          'A Jornada de Criação e Implementação do Livro “Astronomia Poética em: O Surgimento do Universo”',
          'Treinando o olhar para caçar asteroide',
          'Astronomia, infância e psicanálise: quando a experiência de si passa para a experiência do mundo',
        ],
      },
      { time: '12h20', text: 'Informes' },
      { time: '12h30', text: 'Almoço' },
      {
        time: '14h00',
        text: 'Mesa redonda – Astronomia em espaços formais e não formais',
        description: [
          'Profa. Dra. Tina Andreolla (UTFPR)',
          'Dra. Thayse Adineia Pacheco (UFRGS)',
          'Sr. Alexandre Amorim (NEOA-JBS)',
          'Prof. Diego de Bastiani (SEDUC Chapecó/Associação Apontador de Estrelas) – Mediador',
        ],
      },
      { time: '15h00', text: 'Apresentações dos grupos de astronomia' },
      { time: '15h45', text: 'Assembleia' },
      { time: '17h00', text: 'Encerramento' },
    ],
  },
]

export default function PresentationPage() {
  return (
    <Section variant="callaction">
      <Container className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-primary">Programação</h1>
        <h2 className="text-2xl">
          Local: EEB Bom Pastor - R. Florianópolis, 314 E - Centro, Chapecó
        </h2>

        {schedule.map((day) => (
          <>
            <h2 className="mt-8 text-2xl font-bold text-primary">
              {day.title}
            </h2>
            <ul className="mt-4 flex w-full flex-col items-center gap-8">
              {day.times.map((time) => (
                <li
                  key={time.time}
                  className="flex w-full  max-w-3xl items-center gap-8 rounded-lg bg-background px-12 py-16 shadow-lg"
                >
                  <span className="font-bold text-primary">{time.time}</span>
                  <Separator orientation="vertical" />
                  <div>
                    <span className="text-justify font-bold">{time.text}</span>
                    {time.description && (
                      <ul className="mt-4">
                        {Array.isArray(time.description) ? (
                          time.description.map((desc) => (
                            <li className="list-disc text-justify" key={desc}>
                              {desc}
                            </li>
                          ))
                        ) : (
                          <li className="text-justify">{time.description}</li>
                        )}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ))}
      </Container>
    </Section>
  )
}
