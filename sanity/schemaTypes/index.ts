import { type SchemaTypeDefinition } from 'sanity'

import { caseStudy } from './caseStudy'
import { contactSubmission } from './contactSubmission'
import { homePage } from './homePage'
import { link } from './link'
import { serviceCard } from './serviceCard'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, siteSettings, caseStudy, contactSubmission, link, serviceCard],
}

/** Document types that exist exactly once and are edited in place. */
export const singletonTypes = new Set(['homePage', 'siteSettings'])
