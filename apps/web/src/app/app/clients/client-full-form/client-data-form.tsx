import { format } from 'date-fns'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { inputCpfMask, inputPhoneMask } from '@/utils/inputMasks'

import { ClientFormData } from '.'

export function ClientDataForm() {
  const form = useFormContext<ClientFormData>()

  return (
    <div className="flex w-full flex-col gap-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Nome do paciente" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Row>
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="000.000.000-00"
                  maxLength={14}
                  {...field}
                  value={inputCpfMask(field.value || '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="(00) 0 0000-0000"
                  maxLength={15}
                  {...field}
                  value={inputPhoneMask(field.value ?? '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Row>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Row>
        <FormField
          control={form.control}
          name="isALongTimeClient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente Antigo</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ? 'true' : 'false'}
                disabled={field.disabled}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione se é um cliente antigo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de nascimento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                  className="block w-full"
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
          name="civilStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado civil</FormLabel>
              <FormControl>
                <Input placeholder="Estado civil" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profissão</FormLabel>
              <FormControl>
                <Input placeholder="Profissão" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Row>

      <FormField
        control={form.control}
        name="comments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações</FormLabel>
            <FormControl>
              <Input placeholder="Observações" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
