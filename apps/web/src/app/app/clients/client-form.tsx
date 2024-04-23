'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'

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
import { inputCpfMask, inputPhoneMask } from '@/utils/inputMasks'

import { Client } from './columns'

const formSchema = z.object({
  name: z.string().min(1),
  cpf: z.string().optional(),
  phone: z.string().optional(),
})

type ClientUseFormProps = UseFormReturn<z.infer<typeof formSchema>>

interface ButtonsProps {
  form: ClientUseFormProps
}

export function ClientForm({
  refetch,
  client,
  isOpen,
  setIsOpen,
  buttons,
}: {
  refetch: (client?: Client) => void
  client?: Client
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void

  buttons?: (b: ButtonsProps) => React.ReactNode
}) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: client?.name || '',
      cpf: client?.cpf || '',
      phone: client?.phone || '',
    },
  })

  const createClient = trpc.createClients.useMutation({
    onSuccess: ({ client }) => {
      form.reset()
      setIsOpen(false)
      refetch(client)

      toast({
        title: 'Paciente cadastrado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao cadastrar o paciente',
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  const updateClient = trpc.updateClient.useMutation({
    onSuccess: ({ client }) => {
      form.reset()
      setIsOpen(false)
      refetch(client)

      toast({
        title: 'Paciente atualizado com sucesso',
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao atualizar o paciente',
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (client) {
        await updateClient.mutateAsync({
          id: client.id,
          ...values,
        })
      } else {
        await createClient.mutateAsync({
          ...values,
        })
      }

      console.log('values', values)
    } catch (error) {}
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen, form])

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation()

          return form.handleSubmit(onSubmit)(e)
        }}
        className="space-y-8"
      >
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

        {!buttons ? (
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : client ? (
              'Editar'
            ) : (
              'Cadastrar'
            )}
          </Button>
        ) : (
          buttons({ form })
        )}
      </form>
    </Form>
  )
}
