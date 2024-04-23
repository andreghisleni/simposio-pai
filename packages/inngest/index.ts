import { serve } from 'inngest/next'

import { inngest } from './client'
import { helloWorld } from './functions/test'
import { generatePdf } from './functions/test2'

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, generatePdf],
})

export { inngest }
