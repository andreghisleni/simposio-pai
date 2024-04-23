import axios from 'axios'

interface Address {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
}

export const getAddress = async (cep: string): Promise<Address | null> => {
  try {
    const response = await axios.get(
      `https://brasilapi.com.br/api/cep/v1/${cep}`,
    )

    return response.data
  } catch {
    return null
  }
}
