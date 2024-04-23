'use client'

import { RouterOutput } from '@simposio-pai/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, startOfDay } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { ClientInput } from '@/components/client-input'
import { ReactSelect } from '@/components/Select'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'
import { cn } from '@/lib/utils'
import { addTime } from '@/utils/addMinutes'

const formSchema = z.object({
  clientId: z.string().uuid(),
  startAt: z.coerce.date(),
  startTime: z.string(),
  endTime: z.string(),
  scheduleTypeId: z.string().uuid(),
  duration: z.number(),
})
export type ScheduleItem = RouterOutput['getSchedule']['schedule']['scheduleItens'][0] // eslint-disable-line

interface ButtonsProps {
  isSubmitting: boolean
}

export function ScheduleItemForm({
  refetch,
  scheduleItem,
  scheduleId,
  isOpen,
  handleClose,
  start,
  buttons,
}: {
  refetch: (scheduleItem?: ScheduleItem) => void
  scheduleItem?: ScheduleItem
  scheduleId: string
  start?: string
  isOpen: boolean
  handleClose: () => void

  buttons?: (b: ButtonsProps) => React.ReactNode
}) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientId: '',
      startAt: startOfDay(new Date()),
      startTime: '00:00',
      scheduleTypeId: '',
    },
    values: {
      clientId: scheduleItem?.clientId || '',
      startAt: startOfDay(scheduleItem?.startAt || start || new Date()),
      startTime: format(scheduleItem?.startAt || start || new Date(), 'HH:mm'),
      endTime: '',
      scheduleTypeId: scheduleItem?.scheduleTypeId || '',
      duration: scheduleItem?.scheduleType.time || 0,
    },
  })

  const { data: scheduleTypesData } = trpc.getScheduleTypes.useQuery({})

  const createScheduleItem = trpc.createScheduleItem.useMutation({
    onSuccess: ({ scheduleItem }) => {
      form.reset()
      handleClose()
      refetch(scheduleItem as any) // eslint-disable-line @typescript-eslint/no-explicit-any

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

  // const updateScheduleItem = trpc.updateScheduleItem.useMutation({
  //   onSuccess: ({ scheduleItem }) => {
  //     form.reset()
  //     setIsOpen(false)
  //     refetch(scheduleItem)

  //     toast({
  //       title: 'Paciente atualizado com sucesso',
  //     })
  //   },
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   onError: (error: any) => {
  //     console.log(error) // eslint-disable-line no-console
  //     toast({
  //       title: 'Erro ao atualizar o paciente',
  //       description: error.response?.data as string,

  //       variant: 'destructive',
  //     })
  //   },
  // })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (scheduleItem) {
        // await updateScheduleItem.mutateAsync({
        //   id: scheduleItem.id,
        //   ...values,
        // })
      } else {
        await createScheduleItem.mutateAsync({
          scheduleId,
          clientId: values.clientId,
          startAt: new Date(
            `${format(values.startAt, 'yyyy-MM-dd')}T${values.startTime}`,
          ),
          scheduleTypeId: values.scheduleTypeId,
          endAt: new Date(
            `${format(values.startAt, 'yyyy-MM-dd')}T${values.endTime}`,
          ),
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

  form.watch('duration') &&
    form.setValue(
      'endTime',
      addTime(form.getValues('startTime'), form.watch('duration') || 0),
    )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dia</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                      disabled
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora</FormLabel>
              <FormControl>
                <Input placeholder="Hora da consulta" type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <ClientInput
                  clientId={field.value}
                  setClientId={(clientId) => {
                    field.onChange(clientId)
                    console.log('clientId', clientId)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduleTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Procedimento</FormLabel>
              <FormControl>
                <ReactSelect
                  defaultValue={scheduleTypesData?.scheduleTypes
                    .filter((scheduleType) =>
                      field.value?.includes(scheduleType.id),
                    )
                    .map((scheduleType) => ({
                      label: scheduleType.name,
                      value: scheduleType.id,
                    }))}
                  value={scheduleTypesData?.scheduleTypes
                    .filter((scheduleType) =>
                      field.value?.includes(scheduleType.id),
                    )
                    .map((scheduleType) => ({
                      label: scheduleType.name,
                      value: scheduleType.id,
                    }))}
                      onChange={(value: any) => { // eslint-disable-line 
                    console.log(value) // eslint-disable-line no-console
                    field.onChange(value.value) // eslint-disable-line @typescript-eslint/no-explicit-any
                    const scheduleType = scheduleTypesData?.scheduleTypes.find(
                      (st) => st.id === value.value,
                    )

                    form.setValue('duration', scheduleType?.time || 0)

                    // form.setValue('scheduleTypeId', scheduleType.id)
                  }}
                  options={scheduleTypesData?.scheduleTypes.map(
                    (scheduleType) => ({
                      label: `${scheduleType.name} - ${scheduleType.time}min`,
                      value: scheduleType.id,
                    }),
                  )}
                  isDisabled={field.disabled}
                  closeMenuOnSelect
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hora final</FormLabel>
              <FormControl>
                <Input placeholder="Hora final" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!buttons ? (
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : scheduleItem ? (
              'Editar'
            ) : (
              'Cadastrar'
            )}
          </Button>
        ) : (
          buttons({ isSubmitting: form.formState.isSubmitting })
        )}
      </form>
    </Form>
  )
}
