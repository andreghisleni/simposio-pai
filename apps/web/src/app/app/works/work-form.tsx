'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { workSchema } from '@simposio-pai/schema'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { Textarea } from '@/components/ui/textarea'

import { Work } from './columns'

export function WorkForm({ work }: { work: Work }) {
  const form = useForm<z.infer<typeof workSchema>>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      title: work.title,
      presentersName: work.presentersName,
      presentersInstitute: work.presentersInstitute,
      authorsNames: work.authorsNames,
      abstract: work.abstract,
    },
    disabled: true,
  })

  async function onSubmit(values: z.infer<typeof workSchema>) {
    try {
      console.log('values', values)
    } catch (error) {}
  }

  const { fields } = useFieldArray({
    control: form.control,
    name: 'authorsNames' as never,
    rules: {
      required: 'Campo obrigatório',
      minLength: 1,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <Row>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título do trabalho</FormLabel>
                <FormControl>
                  <Input placeholder="Título do trabalho" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>

        <Row>
          <FormField
            control={form.control}
            name="presentersName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do apresentador</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do apresentador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="presentersInstitute"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instituição do apresentador</FormLabel>
                <FormControl>
                  <Input placeholder="Instituição do apresentador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Row>

        {fields.map((field, index) => (
          <Row key={field.id} className="items-end">
            <FormField
              control={form.control}
              name={`authorsNames.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor {index + 1}</FormLabel>
                  <FormControl>
                    <Input placeholder="Autor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Row>
        ))}

        <Row>
          <FormField
            control={form.control}
            name="abstract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Resumo do trabalho (máximo 1000 caracteres) - Total de
                  caracteres: {field.value.length}
                </FormLabel>
                <FormControl>
                  {/* <Input placeholder="Resumo" {...field} /> */}
                  <Textarea {...field} rows={6} />
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
