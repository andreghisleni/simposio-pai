'use client'

import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { trpc } from '@/lib/trpc/react'
import { cn } from '@/lib/utils'
import { statusColors, StatusLabels } from '@/utils/statusColors'

type StatusButtonProps = {
  scheduleItemId: string
  status: keyof typeof StatusLabels
  refetch: () => void
}

export function StatusButton({
  scheduleItemId,
  status,
  refetch,
}: StatusButtonProps) {
  const [position, setPosition] = useState(status)
  const [isRefetching, setIsRefetching] = useState(false)

  const updateStatus = trpc.updateStatusScheduleItem.useMutation({
    onSuccess() {
      refetch()
      setIsRefetching(false)
    },
  })

  const handleChange = (status: string) => {
    setIsRefetching(true)
    setPosition(status as keyof typeof StatusLabels)
    updateStatus.mutate({
      id: scheduleItemId,
      status: status as keyof typeof StatusLabels,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          // variant="outline"
          className={cn(
            'data-[color=PENDING]:bg-[#6c757d]',
            'data-[color=CONFIRMED]:bg-[#3a87ad]',
            'data-[color=CANCELED]:bg-[#d75353]',
            'data-[color=STARTED]:bg-[#e3a62c]',
            'data-[color=FINISHED]:bg-[#f76397]',
            'data-[color=IN_THE_WAITING_ROOM]:bg-[#00d78d]',
            'data-[color=AWAITING_PAYMENT]:bg-[#840000]',
            'data-[color=PAYMENT_CONFIRMED]:bg-[#5cdbcc]',
            'text-white',
            'w-full',
            'justify-between',
          )}
          data-color={status}
        >
          Atualizar status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {isRefetching ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Atualizar status'
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
          {statusColors.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
