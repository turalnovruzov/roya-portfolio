import type { Metadata } from 'next'
import { PortfolioLayout } from '@/components/portfolio'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { draftMode } from 'next/headers'

export default async function HomePage() {
  const featuredProjects = await queryFeaturedProjects()

  return <PortfolioLayout featuredProjects={featuredProjects} />
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Roya Novruzova - Architecture & Design',
    description:
      'Architecture portfolio showcasing residential, commercial, and interior design projects by Roya Novruzova.',
    openGraph: {
      title: 'Roya Novruzova - Architecture & Design',
      description:
        'Architecture portfolio showcasing residential, commercial, and interior design projects.',
      type: 'website',
      url: '/',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Roya Novruzova - Architecture & Design',
      description:
        'Architecture portfolio showcasing residential, commercial, and interior design projects.',
    },
  }
}

const queryFeaturedProjects = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  try {
    const result = await payload.find({
      collection: 'projects',
      draft,
      limit: 12,
      pagination: false,
      overrideAccess: draft,
      sort: '-publishedAt',
      where: {
        or: [
          {
            featured: {
              equals: true,
            },
          },
          {
            featured: {
              exists: false,
            },
          },
        ],
      },
    })

    return result.docs || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
})
