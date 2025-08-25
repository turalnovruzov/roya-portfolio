import type { Project } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section 
      id="portfolio" 
      aria-label="Architecture Projects"
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900 dark:text-white">
            Portfolio
          </h2>
          <div className="w-16 h-1 mx-auto mb-6" 
               style={{ backgroundColor: 'hsl(var(--portfolio-accent))' }}>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of architectural projects spanning residential, commercial, 
            and interior design work.
          </p>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Projects will be displayed here once added through the CMS.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  // Format project duration display
  const formatDuration = (projectDuration: Project['projectDuration']) => {
    if (!projectDuration) return ''
    
    const startDate = projectDuration.startDate ? new Date(projectDuration.startDate) : null
    const endDate = projectDuration.endDate ? new Date(projectDuration.endDate) : null
    const inProgress = projectDuration.inProgress
    
    if (startDate) {
      const startYear = startDate.getFullYear()
      if (inProgress) {
        return `${startYear} - Present`
      } else if (endDate) {
        const endYear = endDate.getFullYear()
        return startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`
      }
      return `${startYear}`
    }
    
    return ''
  }

  // Get cover image URL
  const getCoverImageUrl = () => {
    if (project.coverImage && typeof project.coverImage === 'object') {
      return project.coverImage.url || ''
    }
    return ''
  }

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const coverImageUrl = getCoverImageUrl()
  const duration = formatDuration(project.projectDuration)

  return (
    <Link 
      href={`/projects/${project.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={project.title || 'Project image'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none"
              className="text-gray-400"
            >
              <rect 
                x="3" 
                y="3" 
                width="18" 
                height="18" 
                rx="2" 
                ry="2" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
              <polyline 
                points="21,15 16,10 5,21" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
          </div>
        )}
        
        {/* Featured badge */}
        {project.featured && (
          <div 
            className="absolute top-3 right-3 px-2 py-1 text-xs font-medium text-white rounded-full"
            style={{ backgroundColor: 'hsl(var(--portfolio-accent))' }}
          >
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span 
            className="text-sm font-medium px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: 'hsl(var(--portfolio-accent-light))',
              color: 'hsl(var(--portfolio-accent))'
            }}
          >
            {project.category ? formatCategory(project.category) : 'Project'}
          </span>
          {duration && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {duration}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
          {project.title || 'Untitled Project'}
        </h3>
        
        {project.shortDescription && (
          <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {typeof project.shortDescription === 'string' 
              ? project.shortDescription 
              : 'Project description available in detail view'
            }
          </div>
        )}
        
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {project.tags.slice(0, 3).map((tagItem, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
              >
                {typeof tagItem === 'object' && tagItem.tag ? tagItem.tag : String(tagItem)}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}