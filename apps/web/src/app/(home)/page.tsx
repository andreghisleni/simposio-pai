import Image from 'next/image'
import Link from 'next/link'

import Apoiador1 from '@/assets/apoiadores/Apoiadores1.jpeg'
import Apoiador2 from '@/assets/apoiadores/Apoiadores2.jpeg'
import Apoiador3_1 from '@/assets/apoiadores/Apoiadores3.1.jpeg'
import Apoiador4 from '@/assets/apoiadores/Apoiadores4.jpeg'
import Apoiador5 from '@/assets/apoiadores/Apoiadores5.jpeg'
import Apoiador6 from '@/assets/apoiadores/Apoiadores6.jpeg'
import Apoiador7 from '@/assets/apoiadores/Apoiadores7.jpeg'
import Apoiador8 from '@/assets/apoiadores/Apoiadores8.jpeg'
import Apoiador9 from '@/assets/apoiadores/Apoiadores9.png'
import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'
import { Button } from '@/components/ui/button'

const apoiadores = [
  {
    nome: 'Apontadores de estrelas',
    logo: Apoiador5,
  },
  {
    nome: 'UDESC Oeste',
    logo: Apoiador2,
  },
  {
    nome: 'IFSC Câmpus Xanxerê',
    logo: Apoiador1,
  },
  {
    nome: 'IFSC Câmpus Chapecó',
    logo: Apoiador9,
  },
  {
    nome: 'UFFS Campus Chapecó',
    logo: Apoiador3_1,
  },
  {
    nome: 'EEB Bom Pastor',
    logo: Apoiador7,
  },
  {
    nome: 'Espaço Astronomia UDESC Oeste',
    logo: Apoiador6,
  },
  {
    nome: 'Conversando com o céu',
    logo: Apoiador4,
  },
  {
    nome: 'Planetário Digital UFFS',
    logo: Apoiador8,
  },
]

export default function Homepage() {
  console.log(
    Apoiador1,
    Apoiador2,
    Apoiador3_1,
    Apoiador4,
    Apoiador5,
    Apoiador6,
    Apoiador7,
    Apoiador8,
    Apoiador9,
  )
  return (
    <div>
      <Section variant="callaction">
        <Container className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl font-bold">
            XI Simpósio Catarinense de Astronomia
          </h1>
          <Button asChild className="bg-primary hover:bg-primary/75" size="lg">
            <Link href="/subscribe">Inscreva-se</Link>
          </Button>
        </Container>
      </Section>
      <Section>
        <Container className="flex flex-col gap-8">
          <div className="flex justify-center">
            <h1 className="text-2xl">Organizadores</h1>
          </div>
          <ul className="grid grid-flow-row grid-cols-4 gap-x-4 gap-y-4">
            {apoiadores.map((apoiador) => (
              <li key={apoiador.nome} className="mb-20">
                <Image
                  src={apoiador.logo}
                  placeholder="blur"
                  // layout="responsive"
                  alt={apoiador.nome}
                  className="object-cover"
                  width={270}
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </div>
  )
}
