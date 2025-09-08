import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Architecture portfolio showcasing residential, commercial, and interior design projects by Roya Novruzova.',
  images: [
    {
      url: `${getServerSideURL()}/portfolio-og.jpg`,
    },
  ],
  siteName: 'Roya Novruzova - Architecture & Design',
  title: 'Roya Novruzova - Architecture & Design',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
