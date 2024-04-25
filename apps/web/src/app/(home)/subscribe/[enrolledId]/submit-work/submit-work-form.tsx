'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { workSchema } from '@simposio-pai/schema'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import z from 'zod'

import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'
import { Row } from '@/components/Row'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

export function SubmitWorkForm({
  enrolledId,
  name,
  institute,
}: {
  enrolledId: string
  name: string
  institute: string
}) {
  const router = useRouter()

  const { toast } = useToast()
  const form = useForm<z.infer<typeof workSchema>>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      title: '',
      presentersName: name,
      presentersInstitute: institute,
      authorsNames: ['Autor 1'],
      abstract: '',
    },
  })

  const createClinic = trpc.createWork.useMutation({
    onSuccess: () => {
      form.reset()

      toast({
        title: 'Inscrição realizada com sucesso',
      })

      router.push(`/subscribe/${enrolledId}`)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao realizar inscrição',
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(values: z.infer<typeof workSchema>) {
    try {
      await createClinic.mutateAsync({ ...values, enrolledId })

      console.log('values', values)
    } catch (error) {}
  }

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: 'authorsNames' as never,
    rules: {
      required: 'Campo obrigatório',
      minLength: 1,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Section variant="callaction">
          <Container className="space-y-8">
            <h2 className="text-center text-3xl font-bold text-primary">
              Submeta seu trabalho
            </h2>

            <Row>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo do trabalho</FormLabel>
                    <FormControl>
                      <Input placeholder="Titulo do trabalho" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Row>

            <Row className="items-center">
              <Button
                type="button"
                onClick={() => append(`Autor ${fields.length + 1}`)}
              >
                Adicionar autor
              </Button>
              {form.formState.errors.authorsNames && (
                <FormMessage>
                  {form.formState.errors.authorsNames.message}
                </FormMessage>
              )}
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
                        <div className="flex gap-4">
                          <Input placeholder="Autor" {...field} />
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
                          >
                            Remover
                          </Button>
                        </div>
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
                      Resumo do trabalho (máximo 1000 caracteres)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Resumo" {...field} />
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
                      <Input
                        placeholder="Instituição do apresentador"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Row>

            <Row className="justify-center">
              <Button type="submit" className="bg-primary hover:bg-primary/75">
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </Row>
          </Container>
        </Section>
      </form>
    </Form>
  )
}
