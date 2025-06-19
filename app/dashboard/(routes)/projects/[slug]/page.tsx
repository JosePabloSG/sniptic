import { Suspense } from 'react'
import { ProjectDetailLoading, ProjectDetailView } from '@/components/projects'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectName = decodeURIComponent(params.slug)

  return (
     <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{projectName}</h1>
          <p className="text-muted-foreground">
            Todos los snippets de este proyecto
          </p>
        </div>
      </div>

      <Suspense fallback={<ProjectDetailLoading />}>
        <ProjectDetailView projectName={projectName} />
      </Suspense>
    </div>
  )
}
