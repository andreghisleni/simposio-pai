import { useFormContext } from 'react-hook-form'

import { ClientInput } from '@/components/client-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { ClientFormData } from '.'

export function ClientParentsForm() {
  const form = useFormContext<ClientFormData>()

  return (
    <div className="flex w-full flex-col gap-4">
      <FormField
        control={form.control}
        name="fatherId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do pai</FormLabel>
            <FormControl>
              <ClientInput
                clientId={field.value}
                setClientId={(clientId) => {
                  field.onChange(clientId)
                }}
                placeholder="Selecione o pai"
                disabled={field.disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="motherId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da mãe</FormLabel>
            <FormControl>
              <ClientInput
                clientId={field.value}
                setClientId={(clientId) => {
                  field.onChange(clientId)
                }}
                placeholder="Selecione a mãe"
                disabled={field.disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
