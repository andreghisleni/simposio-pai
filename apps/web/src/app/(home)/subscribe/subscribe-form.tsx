'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { enrolledSchema } from '@simposio-pai/schema'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'
import { inputCpfMask, inputPhoneMask } from '@/utils/inputMasks'

export function SubscribeForm() {
  const router = useRouter()

  const { toast } = useToast()
  const form = useForm<z.infer<typeof enrolledSchema>>({
    resolver: zodResolver(enrolledSchema),
    defaultValues: {
      name: '',
      email: '',
      document: '',
      phone: '',
      birthDate: undefined,
      city: '',
      state: '',
      occupationArea: '',
      institute: '',
      interestedInStayingInAccommodation: false,
    },
  })

  const createClinic = trpc.createEnrolled.useMutation({
    onSuccess: ({ enrolled }) => {
      form.reset()

      toast({
        title: 'Inscrição realizada com sucesso',
      })

      router.push(`/subscribe/${enrolled.id}/success`)
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

  async function onSubmit(values: z.infer<typeof enrolledSchema>) {
    try {
      await createClinic.mutateAsync(values)

      console.log('values', values)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Section variant="callaction">
          <Container className="space-y-8">
            <h2 className="text-center text-3xl font-bold text-primary">
              Inscreva-se (Lista de espera)
            </h2>

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
                        type="date"
                        {...field}
                        value={field.value?.toString()}
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
