import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import type { ClassificationData } from '@/types/database'

interface JsonViewerProps {
  data: ClassificationData
}

export function JsonViewer({ data }: JsonViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Datos JSON</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {data.snippets.length} snippets
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {isExpanded ? 'Colapsar' : 'Expandir'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isExpanded ? (
          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-sm">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ) : (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              <strong>Estructura de datos:</strong>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Snippets:</strong> {data.snippets.length}
              </div>
              <div>
                <strong>Categorías:</strong> {data.categories.length}
              </div>
              <div>
                <strong>Lenguajes:</strong> {data.languages.length}
              </div>
              <div>
                <strong>Frameworks:</strong> {data.frameworks.length}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
