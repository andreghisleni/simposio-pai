import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { enrolledsRouter } from './routers/enrolleds'
import { storageRouter } from './routers/storage'
import { usersRouter } from './routers/users'
import { worksRouter } from './routers/works'
import { createCallerFactory, mergeRouters } from './trpc'

export const appRouter = mergeRouters(
  usersRouter,
  storageRouter,
  enrolledsRouter,
  worksRouter,
)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
