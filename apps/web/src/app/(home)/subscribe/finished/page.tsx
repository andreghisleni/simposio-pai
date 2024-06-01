import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Inscrições encerradas',
}

export default async function Finished() {
  return (
    <div className="flex h-full min-h-screen w-full justify-center">
      <h1 className="text-4xl">Inscrições encerradas.</h1>
    </div>
  )
}
