'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { ScheduleItem, ScheduleItemForm } from './schedule-item-form'

export function ScheduleItemFormSheet({
  refetch,
  scheduleItem,
  scheduleId,
  isOpen,
  handleClose,
  start,
}: {
  refetch: (scheduleItem?: ScheduleItem) => void
  scheduleItem?: ScheduleItem
  scheduleId: string
  start?: string
  isOpen: boolean
  handleClose: () => void
}) {
  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      {/* <SheetTrigger asChild>
        <Button variant="outline">
          {scheduleItem ? 'Editar' : 'Adicionar'}
        </Button>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {scheduleItem ? 'Editar' : 'Cadastrar'}Paciente
          </SheetTitle>
          <SheetDescription>
            {scheduleItem ? 'Editar' : 'Cadastrar'} paciente
          </SheetDescription>
        </SheetHeader>
        <ScheduleItemForm
          {...{
            refetch,
            scheduleItem,
            scheduleId,
            isOpen,
            handleClose,
            start,
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
