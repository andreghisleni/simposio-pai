import { serverClient } from '@/lib/trpc/server'
import { jsonToCsv } from '@/utils/json-to-csv'

import { DownloadZipButton } from './donwload-zip-button'

export async function Astrophotographies() {
  const { astrophotographies } = await serverClient.getAstrophotographies()

  return (
    <div>
      <h1>Total {astrophotographies.length}</h1>
      <DownloadZipButton
        files={[
          ...astrophotographies
            .map((astrophotography) => [
              {
                name: `astrophotographies/${astrophotography.id}/${astrophotography.title.replaceAll(' ', '-').replaceAll('/', '-')}.${astrophotography.photo?.split('.').pop()}`,
                url: `/astrophotographies/download/${astrophotography.id}/photo`,
              },
              {
                name: `astrophotographies/${astrophotography.id}/${astrophotography.title.replaceAll(' ', '-')}.pdf`,
                url: `/astrophotographies/download/${astrophotography.id}/termsOfUse`,
              },
            ])
            .flat(),
        ]}
        csvs={[
          {
            name: 'astrophotographies.csv',
            data:
              jsonToCsv(
                astrophotographies.map((astrophotography) => ({
                  id: astrophotography.id,
                  title: astrophotography.title,
                  photo: `astrophotographies/${astrophotography.id}/${astrophotography.title.replaceAll(' ', '-').replaceAll('/', '-')}.${astrophotography.photo?.split('.').pop()}`,
                  date: astrophotography.date,
                  equipment: astrophotography.equipment,
                  image_details: astrophotography.image_details,
                  place: astrophotography.place,
                  termsOfUse: `astrophotographies/${astrophotography.id}/${astrophotography.title.replaceAll(' ', '-')}.pdf`,
                  enrolledId: astrophotography.enrolledId,
                  enrolledName: astrophotography.enrolled.name,
                  createdAt: astrophotography.createdAt,
                  updatedAt: astrophotography.updatedAt,
                })),
              ) || '',
          },
        ]}
      />
    </div>
  )
}
