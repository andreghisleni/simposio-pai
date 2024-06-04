'use client'

import { downloadZip } from 'client-zip'
import { useState } from 'react'
import streamSaver from 'streamsaver'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export function DownloadZipButton({
  files,
  csvs,
}: {
  files: { name: string; url: string }[]
  csvs: { name: string; data: string }[]
}) {
  const [isDownloading, setIsDownloading] = useState(false)
  const downloadZipButton = async () => {
    setIsDownloading(true)
    const filesToDownload = await Promise.all(
      files.map(async ({ name, url }) => ({
        name,
        input: (
          await api.get(url, {
            responseType: 'blob',
          })
        ).data,
      })),
    )

    const csvsToDownload = csvs.map(({ name, data }) => ({
      name,
      input: new Blob([data], { type: 'text/csv' }),
      lastModified: new Date(),
    }))

    downloadZip([...filesToDownload, ...csvsToDownload]).body?.pipeTo(
      streamSaver.createWriteStream('final_name.zip'),
    )

    setIsDownloading(false)
  }

  return (
    <Button onClick={downloadZipButton} disabled={isDownloading}>
      {isDownloading ? 'Downloading...' : 'Download'}
    </Button>
  )
}
