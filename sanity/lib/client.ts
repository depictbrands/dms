import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Query the live API, not the CDN: results are cached by Next ("use cache")
  // and cleared on publish via /api/revalidate, so the CDN would only add staleness.
  useCdn: false,
})
