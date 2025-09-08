import type { Project } from '@/payload-types'
import { PortfolioHero } from './PortfolioHero'
import { ResumeSection } from './ResumeSection'
import { ProjectsGrid } from './ProjectsGrid'
import { ContactSection } from './ContactSection'

interface PortfolioLayoutProps {
  featuredProjects: Project[]
}

export function PortfolioLayout({ featuredProjects }: PortfolioLayoutProps) {
  return (
    <main className="min-h-screen">
      <PortfolioHero />
      <ResumeSection />
      <ProjectsGrid projects={featuredProjects} />
      <ContactSection />
    </main>
  )
}
