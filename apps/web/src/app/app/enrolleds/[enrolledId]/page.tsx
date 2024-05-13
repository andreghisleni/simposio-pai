import { RouterOutput } from '@simposio-pai/trpc'
import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'
import { z } from 'zod'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { serverClient } from '@/lib/trpc/server'

import { AstroPhotographiesTable } from './submit-astrophoto/submit-astro-photography-table'
import { WorksTable } from './submit-work/submit-work-table'
import { SubscribeForm } from './subscribe-form'

export const metadata: Metadata = {
  title: 'Inscrição',
}

const pageProps = z.object({
  params: z.object({
    enrolledId: z.string(),
  }),
})

export type Enrolled = RouterOutput['getEnrolled']['enrolled']

export default async function EnrolledPage(pp: z.infer<typeof pageProps>) {
  unstable_noStore()

  const {
    params: { enrolledId },
  } = pageProps.parse(pp)

  const { enrolled } = await serverClient.getEnrolled({
    id: enrolledId,
  })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Inscrição: {enrolled.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <SubscribeForm enrolled={enrolled} />
        </CardContent>
      </Card>

      <Tabs defaultValue="works">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="works">Trabalhos submetidos</TabsTrigger>
            <TabsTrigger value="astrophoto">
              Astrofotografias submetidas
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="works">
          <WorksTable works={enrolled.works} />
        </TabsContent>
        <TabsContent value="astrophoto">
          <AstroPhotographiesTable
            astrophotographies={enrolled.astrophotographies}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}
