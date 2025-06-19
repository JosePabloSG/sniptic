import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AddSnippetModal } from '@/components/snippets/add-snippet-modal'
import { FileText, Database } from 'lucide-react'
import type { Category, Language, Framework } from '@/types/database'

interface EmptyStateProps {
  categories: Category[]
  languages: Language[]
  frameworks: Framework[]
  onViewSample?: () => void
  onSnippetAdded?: () => void
}

export function EmptyState({ categories, languages, frameworks, onViewSample, onSnippetAdded }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">No hay snippets disponibles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Parece que aún no tienes snippets en tu biblioteca.
            Comienza creando tu primer snippet o explora con datos de ejemplo.
          </p>
          <div className="flex flex-col gap-2">
            <AddSnippetModal
              categories={categories}
              languages={languages}
              frameworks={frameworks}
              onSnippetAdded={onSnippetAdded}
              trigger={
                <Button className="w-full">
                  Crear mi primer snippet
                </Button>
              }
            />
            {onViewSample && (
              <Button variant="outline" onClick={onViewSample} className="w-full">
                <Database className="h-4 w-4 mr-2" />
                Ver datos de ejemplo
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
