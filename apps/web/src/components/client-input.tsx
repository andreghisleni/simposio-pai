import { CaretSortIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { CheckIcon, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ClientForm } from '@/app/(app)/clients/client-form'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useClients } from '@/hooks/clients.hook'
import { cn } from '@/lib/utils'

type ClientInputProps = {
  clientId?: string
  setClientId: (clientId: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ClientInput({
  clientId,
  setClientId,
  disabled,
  placeholder,
}: ClientInputProps) {
  const [open, setOpen] = useState(false)
  const [showNewClientDialog, setShowNewClientDialog] = useState(false)

  const { clients, isLoading, refetch } = useClients()

  const selectedClient = useMemo(() => {
    return clients.find((client) => client.id === clientId)
  }, [clients, clientId])

  return (
    <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a client"
            className={cn('w-full justify-between')}
            disabled={disabled}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading &&
              (selectedClient
                ? `${selectedClient.name} - ${selectedClient.phone}`
                : placeholder || 'Selecione um paciente')}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Buscar paciente..." />
              <CommandEmpty>Nem um paciente encontrado.</CommandEmpty>
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  onSelect={() => setClientId(client.id)}
                  className="text-sm"
                >
                  {client.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedClient?.id === client.id
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewClientDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Cadastrar paciente
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar paciente</DialogTitle>
        </DialogHeader>
        <ClientForm
          isOpen={showNewClientDialog}
          setIsOpen={setShowNewClientDialog}
          refetch={(client) =>
            (async () => {
              refetch()
              client && setClientId(client.id)
            })()
          }
        />
      </DialogContent>
    </Dialog>
  )
}
