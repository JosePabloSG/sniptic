import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SnippetWithRelations } from '@/types/database'

interface SnippetCardProps {
  snippet: SnippetWithRelations
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{snippet.title}</CardTitle>
        {snippet.description && (
          <p className="text-sm text-muted-foreground">{snippet.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {snippet.categories.name}
          </Badge>
          <Badge
            variant="outline"
            style={{ borderColor: snippet.languages.color || '#6b7280' }}
          >
            {snippet.languages.name}
          </Badge>
          {snippet.frameworks && (
            <Badge variant="outline">
              {snippet.frameworks.name}
            </Badge>
          )}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Creado: {new Date(snippet.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  )
}
