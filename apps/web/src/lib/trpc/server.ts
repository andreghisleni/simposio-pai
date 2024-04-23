import 'server-only'

import { auth } from '@simposio-pai/auth'
import { appRouter, createCallerFactory } from '@simposio-pai/trpc'

export const serverClient = createCallerFactory(appRouter)(async () => {
  const session = await auth()

  return { session }
})
