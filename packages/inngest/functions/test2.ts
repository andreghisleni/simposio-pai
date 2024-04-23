import { PutObjectCommand, r2 } from '@simposio-pai/cloudflare'
import { env } from '@simposio-pai/env'
import { prisma } from '@simposio-pai/prisma'
import axios from 'axios'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { z } from 'zod'

import { inngest } from '../client'

const API_KEY = '1d5fa2f5e70f41809100bc32271a5f9a'

const dataSchema = z.object({
  monthId: z.string().uuid(),
})

export const generatePdf = inngest.createFunction(
  { id: 'generate-pdf' },
  { event: 'test/generate.pdf' },
  async ({ event }) => {
    const { data } = event

    console.log('data', data)

    const { monthId } = dataSchema.parse(data)

    const month = await prisma.month.findUnique({
      where: {
        id: monthId,
      },
      include: {
        forwardings: true,
      },
    })

    if (!month) {
      throw new Error('Month not found')
    }

    await prisma.month.update({
      where: {
        id: monthId,
      },
      data: {
        status: 'GENERATING_DOCUMENT',
      },
    })

    const response = await axios.post(
      'https://api.htmldocs.com/v1/api/generate',
      {
        projectId: '7b469b10d55543f784e8cd68556f2439',
        path: 'index.html',
        context: {
          month: 'março',
          day: '27 de março de 2024',
          patients_body: month.forwardings
            .map(
              (data, index) =>
                '<tr><td>' +
                `${index + 1}. ` +
                data.name +
                '</td><td>' +
                data.document +
                '</td><td>' +
                format(data.day, 'dd/mm/yyyy', {
                  locale: ptBR,
                }) +
                '</td></tr>',
            )
            .join(''),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    )

    if (response.data.url) {
      // download pdf and save on my cloudflare storage

      const pdf = await axios.get(response.data.url, {
        responseType: 'arraybuffer',
      })

      console.log('pdf', pdf)

      const name = `${crypto.randomUUID()}.pdf`

      r2.send(
        new PutObjectCommand({
          Bucket: env.CLOUDFLARE_STORAGE_BUCKET_NAME,
          Key: `${name}`,
          Body: Buffer.from(pdf.data),
          ContentType: 'application/pdf',
        }),
      )

      await prisma.month.update({
        where: {
          id: monthId,
        },
        data: {
          status: 'DOCUMENT_GENERATED',
          document: name,
        },
      })
    }

    return {
      event,
      body: {},
    }
  },
)
