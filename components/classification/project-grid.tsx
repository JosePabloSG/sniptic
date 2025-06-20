import Link from 'next/link'
import { ProjectCard } from './project-card'
import type { SnippetWithRelations } from '@/types/database'

interface ProjectGroup {
  projectName: string
  snippets: SnippetWithRelations[]
  technologies: Array<{
    name: string
    color?: string
    type: 'language' | 'framework'
  }>
}

interface ProjectGridProps {
  snippets: SnippetWithRelations[]
  loading?: boolean
}

export function ProjectGrid({ snippets, loading }: ProjectGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (snippets.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground">
          No se encontraron snippets
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Prueba con diferentes filtros o crea tu primer snippet
        </p>
      </div>
    )
  }

  // Group snippets by project
  const projectGroups = snippets.reduce<Record<string, ProjectGroup>>((acc, snippet) => {
    const projectName = snippet.project_name || 'Sin Proyecto'

    if (!acc[projectName]) {
      acc[projectName] = {
        projectName,
        snippets: [],
        technologies: []
      }
    }

    acc[projectName].snippets.push(snippet)

    // Add language if not already present
    const langExists = acc[projectName].technologies.some(
      tech => tech.name === snippet.languages.name && tech.type === 'language'
    )
    if (!langExists) {
      acc[projectName].technologies.push({
        name: snippet.languages.name,
        color: snippet.languages.color,
        type: 'language'
      })
    }

    // Add framework if present and not already added
    if (snippet.frameworks) {
      const frameworkExists = acc[projectName].technologies.some(
        tech => tech.name === snippet.frameworks!.name && tech.type === 'framework'
      )
      if (!frameworkExists) {
        acc[projectName].technologies.push({
          name: snippet.frameworks.name,
          color: undefined,
          type: 'framework'
        })
      }
    }

    return acc
  }, {})

  const projects = Object.values(projectGroups)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Proyectos</h2>
          <p className="text-muted-foreground">
            Tus snippets organizados por proyecto
          </p>
        </div>
        <Link href="/dashboard/projects">
          <span className="text-primary hover:underline text-sm">
            Ver todos los proyectos →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.projectName}
            href={`/dashboard/projects/${encodeURIComponent(project.projectName)}`}
          >
            <ProjectCard
              project={project}
              onClick={() => { }} // No longer needed since we're using Link
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
