'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { clientSchema } from '@simposio-pai/schema'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'
import { calculateFullAge } from '@/utils/calculateFullAge'
import { inputCpfMask, inputPhoneMask } from '@/utils/inputMasks'

import { Client } from '../columns'
import { ClientAddressForm } from './client-address-form'
import { ClientDataForm } from './client-data-form'
import { ClientParentsForm } from './client-parents-form'

export type ClientFormData = z.infer<typeof clientSchema>
type ClientUseFormProps = UseFormReturn<ClientFormData>

interface ButtonsProps {
  form: ClientUseFormProps
}

export function ClientFullForm({
  refetch,
  client,
  isOpen,
  setIsOpen,
  buttons,
  disabled,
}: {
  refetch: () => void
  client?: Client
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void

  buttons?: (b: ButtonsProps) => React.ReactNode
  disabled?: boolean
}) {
  const { toast } = useToast()
  const form = useForm<ClientFormData>({
    disabled,
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      cpf: '',
      phone: '',
      email: undefined,
      isALongTimeClient: false,
      comments: '',
      birthDate: undefined,
      sex: '',
      civilStatus: '',

      occupation: '',

      cep: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',

      cityOfBirth: '',

      fatherId: '',
      motherId: '',
    },
    values: client
      ? {
          name: client.name,
          cpf: client.cpf || undefined,
          phone: client.phone || undefined,
          email: client.email || undefined,
          isALongTimeClient: client.isALongTimeClient,
          comments: client.comments || undefined,
          birthDate: client.birthDate || undefined,
          sex: client.sex || undefined,
          civilStatus: client.civilStatus || undefined,
          occupation: client.occupation || undefined,
          cep: client.cep || undefined,
          state: client.state || undefined,
          city: client.city || undefined,
          neighborhood: client.neighborhood || undefined,
          street: client.street || undefined,
          number: client.number || undefined,
          complement: client.complement || undefined,
          cityOfBirth: client.cityOfBirth || undefined,
          fatherId: client.fatherId || undefined,
          motherId: client.motherId || undefined,
        }
      : undefined,
  })

  const createClient = trpc.createClients.useMutation({
    onSuccess: () => {
      form.reset()
      setIsOpen(false)
      refetch()

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
    onSuccess: () => {
      form.reset()
      setIsOpen(false)
      refetch()

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

  async function onSubmit(values: ClientFormData) {
    console.log(values)
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
      <div className="grid  grid-cols-1 lg:grid-cols-[400px_minmax(0,_1fr)] ">
        <div className="flex flex-col items-center lg:mr-4 lg:mt-8 lg:border-r">
          <h1 className="text-xl">Paciente: {form.getValues('name')}</h1>

          <div className="flex w-full flex-col gap-4 p-8">
            {[
              {
                label: 'Idade',
                value: form.getValues('birthDate')
                  ? calculateFullAge(form.getValues('birthDate') || new Date())
                  : '',
              },
              {
                label: 'CPF',
                value: inputCpfMask(form.getValues('cpf') || ''),
              },
              {
                label: 'Celular',
                value: form.getValues('phone')
                  ? inputPhoneMask(form.getValues('phone') || '')
                  : '',
              },
              {
                label: 'Email',
                value: form.getValues('email'),
              },
              {
                label: 'Cidade',
                value: `${form.getValues('city')} - ${form.getValues('state')}`,
              },
            ].map((item) => (
              <div key={item.label} className="flex  justify-between gap-2">
                <span>{item.label}:</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* {form.formState.isDirty ? 'editado' : 'nao editado'} */}
          {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre> */}
          <Tabs defaultValue="data">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="data">Dados do paciente</TabsTrigger>
                <TabsTrigger value="address">Endereço do paciente</TabsTrigger>
                <TabsTrigger value="parents">Dados familiares</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="data">
              <ClientDataForm />
            </TabsContent>
            <TabsContent value="address">
              <ClientAddressForm />
            </TabsContent>
            <TabsContent value="parents">
              <ClientParentsForm />
            </TabsContent>
          </Tabs>

          {!buttons && !disabled && (
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : client ? (
                'Editar'
              ) : (
                'Cadastrar'
              )}
            </Button>
          )}
          {buttons && buttons({ form })}
        </form>
      </div>
    </Form>
  )
}
