export function jsonToCsv(jsonData: unknown) {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    return null // Retorna null se não for um array válido
  }

  const headers = Object.keys(jsonData[0]) // Obtém os cabeçalhos do primeiro objeto
  const csvRows = []

  // Adiciona a linha de cabeçalho
  csvRows.push(headers.join(','))

  // Itera sobre os dados e adiciona cada linha ao CSV
  for (const row of jsonData) {
    const values = headers.map((header) => {
      const escapedValue =
        row[header] === undefined || row[header] === null
          ? ''
          : String(row[header])
      return `"${escapedValue.replace(/"/g, '""')}"` // Escapa aspas duplas
    })
    csvRows.push(values.join(','))
  }

  return csvRows.join('\n') // Retorna o CSV completo
}
