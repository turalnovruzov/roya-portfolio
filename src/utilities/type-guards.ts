/**
 * TypeScript type guard utilities for Payload CMS data structures
 * These provide compile-time type safety and eliminate runtime type checking overhead
 */

import type { Media, Project } from '@/payload-types'

// Extract tag type from Project
type ProjectTag = NonNullable<Project['tags']>[0]

/**
 * Type guard for Payload Media objects
 * Distinguishes between Media objects and string URLs
 */
export function isMediaObject(media: unknown): media is Media {
  return (
    media !== null &&
    typeof media === 'object' &&
    'url' in media &&
    typeof (media as Media).url === 'string'
  )
}

/**
 * Type guard for Payload Tag objects
 * Distinguishes between Tag objects and string values
 */
export function isTagObject(tag: unknown): tag is ProjectTag {
  return (
    tag !== null &&
    typeof tag === 'object' &&
    'tag' in tag &&
    typeof (tag as ProjectTag).tag === 'string'
  )
}

/**
 * Helper function to safely extract URL from Media field
 * Returns the URL string or undefined if not available
 */
export function getMediaUrl(media: Media | string | number | null | undefined): string | undefined {
  if (typeof media === 'string') {
    return media
  }
  
  if (typeof media === 'number') {
    // Media ID - cannot extract URL without population
    return undefined
  }
  
  if (isMediaObject(media)) {
    return media.url || undefined
  }
  
  return undefined
}

/**
 * Helper function to safely extract tag string from Tag field
 * Returns the tag string or the original value if it's already a string
 */
export function getTagString(tag: ProjectTag | string | null | undefined): string | undefined {
  if (typeof tag === 'string') {
    return tag
  }
  
  if (isTagObject(tag)) {
    return tag.tag
  }
  
  return undefined
}

/**
 * Helper function to safely extract alt text from Media field
 * Returns the alt text string or undefined if not available
 */
export function getMediaAlt(media: Media | string | number | null | undefined): string | undefined {
  if (isMediaObject(media)) {
    return media.alt || undefined
  }
  
  return undefined
}

/**
 * Helper function to safely extract width from Media field
 * Returns the width number or default if not available
 */
export function getMediaWidth(media: Media | string | number | null | undefined, defaultWidth = 1200): number {
  if (isMediaObject(media) && typeof media.width === 'number' && media.width !== null) {
    return media.width
  }
  
  return defaultWidth
}

/**
 * Helper function to safely extract height from Media field
 * Returns the height number or default if not available
 */
export function getMediaHeight(media: Media | string | number | null | undefined, defaultHeight = 800): number {
  if (isMediaObject(media) && typeof media.height === 'number' && media.height !== null) {
    return media.height
  }
  
  return defaultHeight
}