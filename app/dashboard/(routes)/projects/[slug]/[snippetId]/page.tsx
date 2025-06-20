import { Suspense } from 'react'
import { SnippetDetailView } from '@/components/snippets/snippet-detail-view'
import { SnippetDetailLoading } from '@/components/snippets/snippet-detail-loading'

interface SnippetPageProps {
  params: {
    slug: string
    snippetId: string
  }
}

export default function SnippetPage({ params }: SnippetPageProps) {
  const projectName = decodeURIComponent(params.slug)

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{projectName}</h1>
      </div>

      <Suspense fallback={<SnippetDetailLoading />}>
        <SnippetDetailView
          projectName={projectName}
          snippetId={params.snippetId}
        />
      </Suspense>

    </div>
  )
}
