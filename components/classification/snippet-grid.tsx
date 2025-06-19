import { SnippetCard } from './snippet-card'
import type { SnippetWithRelations } from '@/types/database'

interface SnippetGridProps {
  snippets: SnippetWithRelations[]
  loading?: boolean
}

export function SnippetGrid({ snippets, loading }: SnippetGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  )
}
