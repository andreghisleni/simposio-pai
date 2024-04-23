import { RouterOutput } from '@simposio-pai/trpc'
import { CaretSortIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { CheckIcon, Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useMemo, useState, useTransition } from 'react'

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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type ScheduleSwitcherProps = {
  schedules: RouterOutput['getSchedules']['schedules']
}

export default function ScheduleSwitcher({ schedules }: ScheduleSwitcherProps) {
  const router = useRouter()
  const { scheduleId } = useParams<{ scheduleId?: string }>()

  const [isPendingFilterTransition, startTransition] = useTransition()

  const [open, setOpen] = useState(false)
  const [showNewScheduleDialog, setShowNewScheduleDialog] = useState(false)

  const selectSchedule = useCallback(
    (id: string) => {
      startTransition(() => {
        router.push(`/settings/schedule/day/${id}`)
      })
      setOpen(false)
    },
    [router, startTransition],
  )

  const selectedSchedule = useMemo(() => {
    return schedules.find((schedule) => schedule.id === scheduleId)
  }, [schedules, scheduleId])

  return (
    <Dialog
      open={showNewScheduleDialog}
      onOpenChange={setShowNewScheduleDialog}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a schedule"
            className={cn('w-[200px] justify-between')}
          >
            {isPendingFilterTransition && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {!isPendingFilterTransition &&
              (selectedSchedule?.name ?? 'Select a schedule')}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search schedule..." />
              <CommandEmpty>No schedule found.</CommandEmpty>
              {schedules.map((schedule) => (
                <CommandItem
                  key={schedule.id}
                  onSelect={() => selectSchedule(schedule.id)}
                  className="text-sm"
                >
                  {schedule.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedSchedule?.id === schedule.id
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
                      setShowNewScheduleDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Create Schedule
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create schedule</DialogTitle>
          <DialogDescription>
            Add a new schedule to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Schedule name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription plan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <span className="font-medium">Free</span> -{' '}
                    <span className="text-muted-foreground">
                      Trial for two weeks
                    </span>
                  </SelectItem>
                  <SelectItem value="pro">
                    <span className="font-medium">Pro</span> -{' '}
                    <span className="text-muted-foreground">
                      $9/month per user
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewScheduleDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
