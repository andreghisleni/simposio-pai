import { Edit3Icon, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'

interface EditButtonProps {
  clientId: string
}

export function EditButton({ clientId }: EditButtonProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPendingFilterTransition, startTransition] = useTransition()

  function handleEdit() {
    const params = new URLSearchParams(searchParams)

    params.set('clientId', clientId)

    startTransition(() => {
      router.push(`/clients?${params.toString()}`)
    })
  }

  return (
    <Button onClick={handleEdit}>
      {isPendingFilterTransition ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Edit3Icon />
      )}
    </Button>
  )
}
