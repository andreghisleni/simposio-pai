import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { ClientsTable } from './client-table'

export const metadata: Metadata = {
  title: 'Pacientes',
}

// const uploadsPageSearchParams = z.object({
//   pageIndex: z.coerce.number().default(0),
//   pageSize: z.coerce.number().default(10),
//   tagsFilter: z
//     .union([z.array(z.string()), z.string()])
//     .transform((value) => (Array.isArray(value) ? value : [value]))
//     .optional(),
//   titleFilter: z.string().default(''),
// })

// type UploadsPageSearchParams = z.infer<typeof uploadsPageSearchParams>

export default async function ClientsPage() {
  //   {
  //   searchParams,
  // }: {
  //   searchParams: UploadsPageSearchParams
  // }
  unstable_noStore()

  // const { pageIndex, pageSize, titleFilter, tagsFilter } =
  //   uploadsPageSearchParams.parse(searchParams)

  const { clients } = await serverClient.getClients({})

  return <ClientsTable clients={clients} />
}
