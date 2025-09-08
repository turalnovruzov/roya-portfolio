import { type Metadata } from 'next'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'

import type { Project } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Breadcrumb } from '@/components/navigation/Breadcrumb'
import { ProjectGallery } from '@/components/portfolio/ProjectGallery'
import RichText from '@/components/RichText'
import { createMetaDescription } from '@/utilities/extractTextFromLexical'
import {
  getMediaUrl,
  getTagString,
  getMediaAlt,
  getMediaWidth,
  getMediaHeight,
} from '@/utilities/type-guards'
import Link from 'next/link'
import Image from 'next/image'

// Enable ISR (Incremental Static Regeneration) with 1-hour cache revalidation
// This provides static performance benefits while keeping content fresh
export const revalidate = 3600

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: isDraftMode } = await draftMode()

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    draft: isDraftMode,
    limit: 1,
    overrideAccess: isDraftMode,
    depth: 2, // Populate relationships including coverImage and gallery
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    depth: 0, // Don't need populated data for static params
  })

  const params = projects.docs
    ?.filter((doc): doc is Project => Boolean(doc?.slug))
    .map(({ slug }) => ({ slug }))

  return params || []
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const project = await queryProjectBySlug({ slug })

  if (!project) {
    return {
      title: 'Project Not Found | Roya Novruzova Portfolio',
      description: 'The requested project could not be found.',
    }
  }

  const ogImage = getMediaUrl(project.coverImage)

  // Extract meta description from shortDescription
  let metaDescription = `${project.title} - ${project.category} project by Roya Novruzova`
  if (project.shortDescription) {
    try {
      metaDescription = createMetaDescription(project.shortDescription)
    } catch {
      // Fallback to basic description if extraction fails
      metaDescription = `${project.title} - ${project.category} project by Roya Novruzova`
    }
  }

  return {
    title: `${project.title} | Roya Novruzova Portfolio`,
    description: metaDescription,
    keywords: [
      project.category,
      'architecture',
      'portfolio',
      'design',
      ...(project.tags
        ?.map((tag) => getTagString(tag))
        .filter((tag): tag is string => Boolean(tag)) || []),
    ],
    authors: [{ name: 'Roya Novruzova' }],
    openGraph: {
      title: `${project.title} | Roya Novruzova Portfolio`,
      description: metaDescription,
      type: 'article',
      siteName: 'Roya Novruzova Portfolio',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Roya Novruzova Portfolio`,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const project = await queryProjectBySlug({ slug })

  if (!project) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/#portfolio' },
    { label: 'Portfolio', href: '/#portfolio' },
    { label: project.title, current: true },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="space-y-16">
          {/* Breadcrumb Navigation */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Project Header */}
          <header className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>

                {/* Project Timeline */}
                {project.projectDuration && (
                  <div className="text-lg text-gray-600 mb-6">
                    {project.projectDuration.startDate && (
                      <time dateTime={project.projectDuration.startDate}>
                        {new Date(project.projectDuration.startDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </time>
                    )}
                    {project.projectDuration.inProgress ? (
                      <span> - Present</span>
                    ) : (
                      project.projectDuration.endDate && (
                        <>
                          <span> - </span>
                          <time dateTime={project.projectDuration.endDate}>
                            {new Date(project.projectDuration.endDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </time>
                        </>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-portfolio-accent text-white">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>

                {/* Project Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tagObj, index) => {
                      const tagText = getTagString(tagObj)
                      if (tagText) {
                        return (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {tagText}
                          </span>
                        )
                      }
                      return null
                    })}
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {getMediaUrl(project.coverImage) && (
            <section className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={getMediaUrl(project.coverImage) || ''}
                  alt={getMediaAlt(project.coverImage) || project.title}
                  width={getMediaWidth(project.coverImage)}
                  height={getMediaHeight(project.coverImage)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </section>
          )}

          {/* Project Description */}
          {project.shortDescription && (
            <section className="prose prose-lg prose-gray max-w-3xl mx-auto">
              <RichText
                data={project.shortDescription}
                enableGutter={false}
                enableProse={false}
                className="text-gray-700 leading-relaxed text-lg"
              />
            </section>
          )}

          {/* Project Gallery */}
          <section>
            <ProjectGallery gallery={project.gallery} projectTitle={project.title} />
          </section>

          {/* Back to Portfolio Link */}
          <footer className="pt-16 border-t border-gray-200">
            <div className="text-center">
              <Link
                href="/#portfolio"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-portfolio-accent text-white hover:bg-portfolio-accent/90 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Portfolio
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}
