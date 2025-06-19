import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ClassificationData } from '@/types/database'

interface ClassificationStatsProps {
  statistics: ClassificationData['statistics']
}

export function ClassificationStats({ statistics }: ClassificationStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Estadísticas generales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Total de Snippets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">
            {statistics.totalSnippets}
          </div>
        </CardContent>
      </Card>

      {/* Snippets por categoría */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(statistics.snippetsByCategory).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm">{category}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Snippets por lenguaje */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Por Lenguaje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(statistics.snippetsByLanguage).map(([language, count]) => (
              <div key={language} className="flex justify-between items-center">
                <span className="text-sm">{language}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Snippets por framework */}
      {Object.keys(statistics.snippetsByFramework).length > 0 && (
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Por Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(statistics.snippetsByFramework).map(([framework, count]) => (
                <div key={framework} className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">{framework}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
