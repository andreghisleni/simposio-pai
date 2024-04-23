'use client'

import { ClinicForm } from '../(app)/settings/clinics/clinic-form'
import { handleSignOut } from './actions'

export function Form() {
  return (
    <ClinicForm
      {...{
        refetch: () => handleSignOut(),
        isOpen: true,
      }}
    />
  )
}
