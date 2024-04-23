import { intervalToDuration } from 'date-fns'

export function calculateFullAge(birthDate: Date) {
  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: new Date(),
  })

  return `${years} anos, ${months} meses e ${days} dias`
}
