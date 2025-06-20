'use client'

import { useState, useEffect } from 'react'
import { ProjectCard } from './project-card'
import { useUser } from '@/hooks/use-user'
import { classificationService } from '@/services/client-classification.service'
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

export function ProjectsView() {
  const [projects, setProjects] = useState<ProjectGroup[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      loadProjects()
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadProjects = async () => {
    try {
      setLoading(true)
      const snippets = await classificationService.getSnippetsWithRelations(user!.id)

      // Group snippets by project
      const projectGroups = snippets.reduce<Record<string, ProjectGroup>>((acc: Record<string, ProjectGroup>, snippet: SnippetWithRelations) => {
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
          (tech: { name: string; type: string }) => tech.name === snippet.languages.name && tech.type === 'language'
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
            (tech: { name: string; type: string }) => tech.name === snippet.frameworks!.name && tech.type === 'framework'
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

      setProjects(Object.values(projectGroups))
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-muted-foreground">
          No se encontraron proyectos
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          Crea tu primer snippet para comenzar a organizar por proyectos
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.projectName}
          project={project}
          href={`/dashboard/projects/${encodeURIComponent(project.projectName)}`}
        />
      ))}
    </div>
  )
}
