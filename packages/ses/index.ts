import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { env } from '@simposio-pai/env'
import { IParseMailTemplateDTO, template } from '@simposio-pai/template'
import { convert } from 'html-to-text'

interface IMailContact {
  name: string
  email: string
}
export interface ISendMailDTO {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IParseMailTemplateDTO
}

const client: SESClient = new SESClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

const sendMail = async ({
  to,
  from,
  subject,
  templateData,
}: ISendMailDTO): Promise<void> => {
  const name = 'Simposio PAI'
  const email = env.EMAIL ?? 'envio@andreg.com.br'

  const parsedHTML = await template.parse(templateData)

  await client.send(
    new SendEmailCommand({
      Destination: {
        ToAddresses: [`${to.name} <${to.email}>`],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: parsedHTML,
          },
          Text: {
            Charset: 'UTF-8',
            Data: convert(parsedHTML, {
              wordwrap: 130,
            }),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: `${from?.name || name} <${from?.email || email}>`,
    }),
  )
}

export const ses = {
  sendMail,
}

export * from './emails'
