'use server'
import { signOut } from '@simposio-pai/auth'

export async function handleSignOut() {
  await signOut()
}
