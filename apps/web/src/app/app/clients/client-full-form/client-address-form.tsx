import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Row } from '@/components/Row'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { inputCepMask } from '@/utils/inputMasks'

import { ClientFormData } from '.'
import { getAddress } from './get-address'

export function ClientAddressForm() {
  const form = useFormContext<ClientFormData>()
  const { toast } = useToast()
  const [isFindingAddress, setIsFindingAddress] = useState(false)

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value
    if (cep.length < 9) return

    setIsFindingAddress(true)

    const cepWithoutMask = cep.replace(/\D/g, '')

    const address = await getAddress(cepWithoutMask)
    if (!address) {
      toast({
        title: 'CEP não encontrado',
        variant: 'destructive',
      })
      setIsFindingAddress(false)
      return
    }

    // console.log('address', address)

    form.setValue('state', address.state)
    form.setValue('city', address.city)
    form.setValue('neighborhood', address.neighborhood)
    form.setValue('street', address.street)

    setIsFindingAddress(false)
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Row>
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  placeholder="00000-000"
                  maxLength={9}
                  {...field}
                  value={inputCepMask(field.value ?? '')}
                  onBlur={handleCepBlur}
                  disabled={isFindingAddress || field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  placeholder="Estado"
                  {...field}
                  disabled={isFindingAddress || field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Row>

      <Row>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cidade"
                  {...field}
                  disabled={isFindingAddress || field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input
                  placeholder="Bairro"
                  {...field}
                  disabled={isFindingAddress || field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Row>

      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rua</FormLabel>
            <FormControl>
              <Input
                placeholder="Rua"
                {...field}
                disabled={isFindingAddress || field.disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Row>
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input
                  placeholder="Número"
                  {...field}
                  disabled={isFindingAddress || field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input
                  placeholder="Complemento"
                  {...field}
                  disabled={isFindingAddress || field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Row>
    </div>
  )
}
