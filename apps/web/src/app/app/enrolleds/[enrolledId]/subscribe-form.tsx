'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { enrolledSchema } from '@simposio-pai/schema'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Row } from '@/components/Row'
import {
  Form,
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

import { Enrolled } from './page'

export function SubscribeForm({ enrolled }: { enrolled: Enrolled }) {
  const form = useForm<z.infer<typeof enrolledSchema>>({
    resolver: zodResolver(enrolledSchema),
    defaultValues: {
      name: enrolled.name,
      email: enrolled.email,
      document: enrolled.document,
      phone: enrolled.phone,
      birthDate: enrolled.birthDate,
      city: enrolled.city,
      state: enrolled.state,
      occupationArea: enrolled.occupationArea,
      institute: enrolled.institute,
      interestedInStayingInAccommodation:
        enrolled.interestedInStayingInAccommodation,
    },
    disabled: true,
  })

  async function onSubmit(values: z.infer<typeof enrolledSchema>) {
    try {
      console.log('values', values)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Row>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>

        <Row>
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="000.000.000-00"
                    {...field}
                    value={inputCpfMask(field.value)}
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
                    {...field}
                    value={inputPhoneMask(field.value)}
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
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={
                      field.value
                        ? format(`${field.value.toISOString().split('T')[0]}T10:00:00Z`, 'dd/MM/yyyy') // eslint-disable-line
                        : ''
                    }
                    className="block w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestedInStayingInAccommodation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Teria interesse de hospedar-se em alojamento, caso seja
                  oferecido?
                </FormLabel>
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
        </Row>
        <Row>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade" {...field} />
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
                  <Input placeholder="Estado" maxLength={2} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>

        <Row>
          <FormField
            control={form.control}
            name="occupationArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área de Atuação</FormLabel>
                <FormControl>
                  <Input placeholder="Área de Atuação" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>
        <Row>
          <FormField
            control={form.control}
            name="institute"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instituição</FormLabel>
                <FormControl>
                  <Input placeholder="Instituição" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>
      </form>
    </Form>
  )
}
