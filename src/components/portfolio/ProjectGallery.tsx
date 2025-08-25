import React from 'react'
import Image from 'next/image'
import type { Project } from '@/payload-types'

interface ProjectGalleryProps {
  gallery: Project['gallery']
  projectTitle: string
}

export function ProjectGallery({ gallery, projectTitle }: ProjectGalleryProps) {
  if (!gallery || gallery.length === 0) {
    return null
  }

  return (
    <section className="space-y-12">
      <h2 className="text-3xl font-bold text-gray-900 text-center">Project Gallery</h2>
      <div className="space-y-16">
        {gallery.map((item, index) => {
          // Type guard to ensure we have a valid gallery item
          if (typeof item !== 'object' || !item || typeof item.image !== 'object' || !item.image?.url) {
            return null
          }

          const image = item.image
          const caption = item.caption

          return (
            <figure key={`gallery-${index}`} className="w-full max-w-4xl mx-auto">
              <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-gray-100">
                <Image
                  src={image.url || ''}
                  alt={image.alt || `${projectTitle} gallery image ${index + 1}`}
                  width={image.width || 1200}
                  height={image.height || 800}
                  className="w-full h-auto object-cover transition-opacity duration-300"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                />
              </div>
              {caption && (
                <figcaption className="mt-6 text-base text-gray-600 italic text-center leading-relaxed max-w-2xl mx-auto">
                  {caption}
                </figcaption>
              )}
            </figure>
          )
        })}
      </div>
    </section>
  )
}