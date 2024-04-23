export enum StatusColors {
  PENDING = '#6c757d',
  CONFIRMED = '#3a87ad',
  CANCELED = '#d75353',
  STARTED = '#e3a62c',
  FINISHED = '#f76397',
  IN_THE_WAITING_ROOM = '#00d78d',
  AWAITING_PAYMENT = '#840000',
  PAYMENT_CONFIRMED = '#00d7be',
}

export enum StatusLabels {
  PENDING = 'Pendente',
  CONFIRMED = 'Confirmado',
  CANCELED = 'Cancelado',
  STARTED = 'Iniciado',
  FINISHED = 'Finalizado',
  IN_THE_WAITING_ROOM = 'Na sala de espera',
  AWAITING_PAYMENT = 'Aguardando pagamento',
  PAYMENT_CONFIRMED = 'Pagamento confirmado',
}

export const statusColors = (
  Object.keys(StatusLabels) as Array<keyof typeof StatusLabels>
).map((key) => ({
  label: StatusLabels[key],
  value: key,
  color: StatusColors[key],
}))
