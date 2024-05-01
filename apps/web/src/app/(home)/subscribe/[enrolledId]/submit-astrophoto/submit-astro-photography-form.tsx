'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { astrophotographySchema } from '@simposio-pai/schema'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { FileUpload } from '@/components/file-upload'
import { Container } from '@/components/my-ui/container'
import { Section } from '@/components/my-ui/section'
import { Row } from '@/components/Row'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useUploadFile } from '@/hooks/useUploadFile'
import { nativeClient } from '@/lib/trpc/client'
import { trpc } from '@/lib/trpc/react'

export function AstroPhotographyForm({ enrolledId }: { enrolledId: string }) {
  const router = useRouter()

  const { toast } = useToast()
  const form = useForm<z.infer<typeof astrophotographySchema>>({
    resolver: zodResolver(astrophotographySchema),
    defaultValues: {
      title: '',
    },
  })

  const [fileName0, setFileName0] = useState<string | undefined>(undefined)
  const [fileName1, setFileName1] = useState<string | undefined>(undefined)

  const files = [
    useUploadFile({
      handleUploadFunction: async (file: File) => {
        const response = await nativeClient.requestUploadUrl.query({
          type: file.type as 'application/pdf' | 'image/png' | 'image/jpeg',
        })

        const uploadURL = response.url

        await axios.put(uploadURL, file, {
          headers: {
            'Content-Type': file.type,
          },
        })

        setFileName0(response.file_name)

        return {
          file_name: response.file_name,
        }
      },
    }),
    useUploadFile({
      handleUploadFunction: async (file: File) => {
        const response = await nativeClient.requestUploadUrl.query({
          type: file.type as 'application/pdf',
        })

        const uploadURL = response.url

        await axios.put(uploadURL, file, {
          headers: {
            'Content-Type': file.type,
          },
        })

        setFileName1(response.file_name)

        return {
          file_name: response.file_name,
        }
      },
    }),
  ]

  const createAstrophotography = trpc.createAstrophotography.useMutation({
    onSuccess: () => {
      form.reset()

      toast({
        title: 'Inscrição realizada com sucesso',
      })

      router.push(`/subscribe/${enrolledId}`)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error) // eslint-disable-line no-console
      toast({
        title: 'Erro ao realizar inscrição',
        description: error.response?.data as string,

        variant: 'destructive',
      })
    },
  })

  async function onSubmit(values: z.infer<typeof astrophotographySchema>) {
    try {
      if (!fileName0 || !fileName1) {
        toast({
          title: 'Erro ao realizar inscrição',
          description: 'Envie as astrofotografias',
          variant: 'destructive',
        })
        return
      }

      await createAstrophotography.mutateAsync({
        ...values,
        enrolledId,
        photo: fileName0,
        termsOfUse: fileName1,
      })

      console.log('values', values)
    } catch (error) {}
  }

  useEffect(() => {
    return () => {
      if (fileName0) {
        console.log(fileName0)
      }
      if (fileName1) {
        console.log(fileName1)
      }

      if (fileName0 && fileName1) {
        console.log('apagar todas')
        nativeClient.deleteFile.query({
          files: [fileName0, fileName1],
        })
      }
      console.log('apagar')
    }
  }, [fileName0, fileName1])

  return (
    <Section variant="callaction">
      <Container className="space-y-8">
        <div className="flex w-full justify-center p-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-3xl font-bold text-primary">
              Submeta sua astrofotografia
            </h1>
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg">
                Envie sua astrofotografia em formato PNG ou JPEG sem
                identificação.
              </span>
              <FileUpload
                file={files[0]}
                buttonTexts={
                  ({ isFileUploading, fileUploadedName }) =>
                    isFileUploading
                      ? 'Enviando...'
                      : fileUploadedName
                ? 'Astrofotografia enviado' // eslint-disable-line
                : 'Enviar astrofotografia sem identificação'/*eslint-disable-line*/
                }
                uploadType="image"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg">
                Envie o{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-primary"
                  href="https://docs.google.com/document/d/1jAD_DXZN3Kfy6SZoZP1dahnvhlXRNX1u/edit?usp=sharing&ouid=100877972451705059128&rtpof=true&sd=true"
                >
                  Termo de Uso de Imagem
                </a>{' '}
                preenchido e assinado.
              </span>
              <span className="text-base">
                Assine o termo de uso de imagem pelo{' '}
                <a
                  href="https://www.gov.br/pt-br/servicos/assinatura-eletronica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-primary"
                >
                  Gov.br
                </a>
              </span>
              <FileUpload
                file={files[1]}
                buttonTexts={
                  ({ isFileUploading, fileUploadedName }) =>
                    isFileUploading
                      ? 'Enviando...'
                      : fileUploadedName
                ? 'Termo de Uso de Imagem enviado' // eslint-disable-line
                : 'Enviar Termo de Uso de Imagem'/*eslint-disable-line*/
                }
                uploadType="pdf"
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
              >
                <Row>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nome do objeto / Título da astrofotografia
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder=" Nome do objeto / Título da astrofotografia"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Row>

                <Row>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value?.toString()}
                            className="block w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Row>

                <Row>
                  <FormField
                    control={form.control}
                    name="equipment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Equipamento utilizado (tipo e/ou modelo do telescópio,
                          câmera, celular, etc...)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Equipamento utilizado"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Row>

                <Row>
                  <FormField
                    control={form.control}
                    name="image_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Detalhes da imagem (tempo de exposição, ISO, abertura,
                          número de frames, etc...)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Detalhes da imagem" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Row>

                <Row className="justify-center">
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/75"
                    disabled={form.formState.isSubmitting || !fileName0}
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      'Cadastrar'
                    )}
                  </Button>
                </Row>
              </form>
            </Form>
          </div>
        </div>
      </Container>
    </Section>
  )
}
