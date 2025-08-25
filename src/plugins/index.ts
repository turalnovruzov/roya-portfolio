import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Project } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Project> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Roya Novruzova` : 'Roya Novruzova - Architecture & Design'
}

const generateURL: GenerateURL<Project> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  // Removed: redirectsPlugin, formBuilderPlugin, payloadCloudPlugin - not needed for simple portfolio
]
