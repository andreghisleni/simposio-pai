import Image from 'next/image'
import Link from 'next/link'

// import Apoiador1 from '@/assets/apoiadores/Apoiadores1.jpeg'
// import Apoiador2 from '@/assets/apoiadores/Apoiadores2.jpeg'
// import Apoiador3_1 from '@/assets/apoiadores/Apoiadores3.1.jpeg'
// import Apoiador4 from '@/assets/apoiadores/Apoiadores4.jpeg'
// import Apoiador5 from '@/assets/apoiadores/Apoiadores5.jpeg'
// import Apoiador6 from '@/assets/apoiadores/Apoiadores6.jpeg'
// import Apoiador7 from '@/assets/apoiadores/Apoiadores7.jpeg'
// import Apoiador8 from '@/assets/apoiadores/Apoiadores8.jpeg'
// import Apoiador9 from '@/assets/apoiadores/Apoiadores9.png'
import Apoiador1 from '@/assets/apoiadores/new/Apoiadores1.png'
import Apoiador2 from '@/assets/apoiadores/new/Apoiadores2.png'
import Apoiador3 from '@/assets/apoiadores/new/Apoiadores3.png'
import Apoiador4 from '@/assets/apoiadores/new/Apoiadores4.png'
import Apoiador5 from '@/assets/apoiadores/new/Apoiadores5.png'
import Apoiador6 from '@/assets/apoiadores/new/Apoiadores6.png'
import Apoiador7 from '@/assets/apoiadores/new/Apoiadores7.png'
import Apoiador8 from '@/assets/apoiadores/new/Apoiadores8.png'
import Apoiador9 from '@/assets/apoiadores/new/Apoiadores9.png'
//
import A from '@/assets/Logos-Organizadores-SIte.png'
import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const apoiadores = [
  [
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
      logo: Apoiador3,
      // w: 470,
    },
    {
      nome: 'EEB Bom Pastor',
      logo: Apoiador7,
    },
  ],
  [
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
  ],
]

export default function Homepage() {
  return (
    <div>
      <Section variant="callaction">
        <Container className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-4xl font-bold text-primary">
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
          <ul className="flex flex-wrap justify-center gap-8">
            {apoiadores[0].map((apoiador) => (
              <li key={apoiador.nome} className="bg-white p-4">
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
          <Separator className="bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200 dark:from-zinc-800 dark:via-zinc-400 dark:to-zinc-800" />

          <ul className="flex flex-wrap justify-center gap-8 ">
            {apoiadores[1].map((apoiador) => (
              <li key={apoiador.nome} className="bg-white p-4">
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

          <Separator className="bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200 dark:from-zinc-800 dark:via-zinc-400 dark:to-zinc-800" />

          <h1 className="text-xl">Imagem fixa:</h1>

          <div className="flex justify-center">
            <Image
              src={A}
              placeholder="blur"
              // layout="responsive"
              alt={'ok'}
              className="object-cover"
            />
          </div>
        </Container>
      </Section>
    </div>
  )
}
