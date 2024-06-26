import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { astrophotographiesRouter } from './routers/astrophotographies'
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
  astrophotographiesRouter,
)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
