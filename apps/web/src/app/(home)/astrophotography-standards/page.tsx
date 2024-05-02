import { Metadata } from 'next'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Normas Astrofotografia',
}

export default function AstrophotographyStandardsPage() {
  return (
    <Section variant="callaction">
      <Container className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-primary">
          Exposição Catarinense de Astrofotografia - O Céu de Santa Catarina
        </h1>
        <p>
          A Associação Apontador de Estrelas, em parceria com a Universidade do
          Estado de Santa Catarina - UDESC Oeste, o Instituto Federal de Santa
          Catarina - IFSC, campi Chapecó e Xanxerê, a Universidade Federal da
          Fronteira Sul - UFFS, campus Chapecó, e EEB Bom Pastor, realizarão,
          durante o 11º Simpósio Catarinense de Astronomia, mais uma edição da
          Exposição Catarinense de Astrofotografia - O Céu de Santa Catarina.
          Por isso, chamamos a todos os amantes por astronomia do nosso estado,
          que se aventuram na área da astrofotografia, a enviarem seus trabalhos
          para integrar a exposição. Desta forma, queremos mostrar a todos os
          participantes do evento e comunidade em geral uma parte do trabalho em
          astronomia realizado no nosso estado e promover o desenvolvimento da
          astrofotografia de Santa Catarina.
        </p>
        <h2 className="mt-4 text-xl font-bold">REGULAMENTO</h2>
        <ol className="list-decimal">
          <li>
            Como forma de incentivo e participação da exposição, serão
            permitidas participar da exposição astrofotografias obtidas dentro
            do estado de Santa Catarina, por pessoas residentes neste estado,
            entre <span className="font-bold">01/01/2023 e 31/05/2024</span>.
          </li>
          <li>
            Todas as astrofotografias submetidas deverão ser de autoria própria
            do astrofotógrafo que as está submetendo.
          </li>
          <li>
            As inscrições são gratuitas e deverão ser realizadas em formulário
            específico, exclusivamente no site oficial do 11° Simpósio
            Catarinense de Astronomia, durante o período de inscrições, de{' '}
            <span className="font-bold">1° a 31 de maio de 2024</span>.
          </li>
          <li>
            No momento da inscrição, o astrofotógrafo deve anexar o termo de
            autorização de uso da imagem{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold underline hover:text-primary"
              href="/api/astrophotographies/term-of-use"
            >
              (Anexo Único)
            </a>
            , assinado.
          </li>
          <li>
            Cada participante poderá participar com a inscrição de até 3 (três)
            astrofotografias.
          </li>
          <li>
            Serão selecionadas até 20 (vinte) astrofotografias, que serão
            impressas, e ficarão expostas durante o evento nos dias 19 e 20 de
            julho de 2024.
          </li>
          <li>
            As astrofotografias para impressão serão selecionadas por uma
            comissão criada para esse fim, a ser divulgada.
          </li>
          <li>
            A exposição impressa, após o evento, poderá ser apresentada em
            outros locais, como forma de ensino e divulgação de astronomia.
          </li>
          <li>
            As demais astrofotografias apresentadas, que estiverem dentro dos
            padrões mínimos exigidos pelas regras da exposição, serão projetadas
            digitalmente durante o evento, mas não serão impressas.
          </li>
          <li>
            Não serão consideradas astrofotografias onde apareçam aviões ou
            outros objetos que não sejam exclusivamente corpos celestes.
          </li>
          <li>
            É permitido o uso de imagens com edições dos seus parâmetros de cor
            e luminosidade, além de empilhamentos. Não é permitido a remoção ou
            o acréscimo de objetos na imagem, além de também não ser permitida a
            movimentação de lugar dos objetos na imagem.
          </li>
          <li>
            A astrofotografia submetida a seleção da exposição será enviada em
            uma versão sem identificação, no formato jpeg ou png.
          </li>
          <li>
            Ao se inscrever, o participante concede o direito de uso de sua(s)
            astrofotografia(s), para ser(em) reproduzida(s) no site do evento ou
            vinculada(s) em materiais de divulgação, sendo preservadas as
            informações de autoria das astrofotografias.
          </li>
          <li>
            Inscrições com dados incompletos, faltantes, ou falsos, não serão
            validadas.
          </li>
          <li>
            As astrofotografias deverão ser inéditas, não podendo ter sido
            publicadas em revistas impressas, participado em outras exposições
            e/ou concursos.
          </li>
          <li>
            Os nomes dos arquivos deverão ser, obrigatoriamente, nomeados com o
            nome do objeto fotografado seguido de três letras referentes às
            iniciais do nome e sobrenome do participante (ex. Lua fotografada
            por Fulano da Silva Beltrano – lua_fsb.jpg).
          </li>
          <li>
            A comissão organizadora concederá certificados impressos para os
            participantes da exposição.
          </li>
          <li>
            Ao se inscrever, o participante concorda integralmente com todos os
            termos deste regulamento.
          </li>
        </ol>
        <Button asChild>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8"
            href="/api/astrophotographies/term-of-use"
          >
            Baixar anexo único
          </a>
        </Button>

        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vTYzp7Ycuctl1m3sWpD2fZi1w3CBtY_v89XN1xxL077w8j0Keoc0GC21qxUcoo69w/pub?embedded=true"
          className="mt-8 h-[600px] w-full max-w-[800px]"
        ></iframe>
      </Container>
    </Section>
  )
}
