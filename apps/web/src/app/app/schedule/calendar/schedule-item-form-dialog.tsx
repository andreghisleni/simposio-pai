'use client'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { trpc } from '@/lib/trpc/react'

import { ScheduleItem, ScheduleItemForm } from './schedule-item-form'
import { StatusButton } from './status-button'

export function ScheduleItemFormDialog({
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
  const { toast } = useToast()
  const cancelScheduleItem = trpc.cancelScheduleItem.useMutation({
    onSuccess: () => {
      refetch()
      handleClose()
      toast({
        title: 'Agendamento cancelado com sucesso',
      })
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {scheduleItem ? 'Editar' : 'Cadastrar'} Paciente
          </DialogTitle>
        </DialogHeader>

        <ScheduleItemForm
          {...{
            refetch,
            scheduleItem,
            scheduleId,
            isOpen,
            handleClose,
            start,
            buttons: ({ isSubmitting }) => (
              <DialogFooter>
                <StatusButton
                  status={scheduleItem?.status || 'PENDING'}
                  scheduleItemId={scheduleItem?.id || ''}
                  refetch={refetch}
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    cancelScheduleItem.mutate({ id: scheduleItem?.id || '' })
                  }
                  disabled={cancelScheduleItem.isPending}
                >
                  {cancelScheduleItem.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    'Cancelar agendamento'
                  )}
                </Button>

                <Button type="submit" className="w-full" disabled>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : scheduleItem ? (
                    'Editar'
                  ) : (
                    'Cadastrar'
                  )}
                </Button>
              </DialogFooter>
            ),
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
