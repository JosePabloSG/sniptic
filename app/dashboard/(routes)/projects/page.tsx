import { Suspense } from 'react'
import { ProjectsView } from '@/components/projects/projects-view'
import { ProjectsLoading } from '@/components/projects/projects-loading'

export default function ProjectsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proyectos</h1>
          <p className="text-muted-foreground">
            Organiza y gestiona tus snippets por proyectos
          </p>
        </div>
      </div>

      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsView />
      </Suspense>
    </div>
  )
} 