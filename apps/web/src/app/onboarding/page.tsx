import Image from 'next/image'

import GClinicLogo from '@/assets/simposio-pai-logo.svg'

import { Form } from './Form'

export default function Homepage() {
  // redirect('/dashboard')
  return (
    <div className="flex h-screen items-center justify-center px-6">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="flex items-center gap-3">
          <Image
            src={GClinicLogo}
            alt="gl"
            className="h-12"
            width={157.49}
            height={48}
          />
          <h1 className="text-sm font-medium">g.clinic</h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold">Crie sua clinica</h2>

          <p className="text-pretty font-medium leading-relaxed">
            g.clinic oferece uma solução completa para clínicas, consultórios e
            profissionais da saúde, com ênfase na integração com sistemas de
            saúde, preço transparente e experiência do usuário excepcional.
          </p>
          <Form />
        </div>
      </div>
    </div>
  )
}
