'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, Check, Edit, Trash2, Calendar, Tag, User, Code2 } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { classificationService } from '@/services/client-classification.service'
import { HighlightCode } from '@/components/ui/highlight-code'
import type { SnippetWithRelations } from '@/types/database'

interface SnippetDetailViewProps {
  projectName: string
  snippetId: string
}

export function SnippetDetailView({ projectName, snippetId }: SnippetDetailViewProps) {
  const [snippet, setSnippet] = useState<SnippetWithRelations | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      loadSnippet()
    }
  }, [user, snippetId]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadSnippet = async () => {
    try {
      setLoading(true)
      const allSnippets = await classificationService.getSnippetsWithRelations(user!.id)

      // Find the specific snippet
      const foundSnippet = allSnippets.find((s: SnippetWithRelations) => s.id === snippetId)

      if (foundSnippet && (foundSnippet.project_name || 'Sin Proyecto') === projectName) {
        setSnippet(foundSnippet)
      } else {
        // Snippet not found or doesn't belong to this project
        setSnippet(null)
      }
    } catch (error) {
      console.error('Error loading snippet:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyCode = async () => {
    if (!snippet) return

    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded-lg" />
        <div className="h-32 bg-muted animate-pulse rounded-lg" />
        <div className="h-96 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  if (!snippet) {
    return (
      <div className="text-center py-12">
        <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground">
          Snippet no encontrado
        </h3>
        <p className="text-sm text-muted-foreground mt-2">
          El snippet que buscas no existe o no pertenece a este proyecto
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{snippet.title}</h1>
          {snippet.description && (
            <p className="text-lg text-muted-foreground">{snippet.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleCopyCode}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar código
              </>
            )}
          </Button>
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Información
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Categoría</p>
              <Badge variant="secondary">{snippet.categories.name}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Lenguaje</p>
              <Badge
                variant="outline"
                style={{ borderColor: snippet.languages.color || '#6b7280' }}
              >
                {snippet.languages.name}
              </Badge>
            </div>
            {snippet.frameworks && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Framework</p>
                <Badge variant="outline">
                  {snippet.frameworks.name}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fechas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Creado</p>
              <p className="text-sm">{new Date(snippet.created_at).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Actualizado</p>
              <p className="text-sm">{new Date(snippet.updated_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Nombre del proyecto</p>
              <p className="text-sm font-medium">{snippet.project_name || 'Sin Proyecto'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Líneas de código</p>
              <p className="text-sm">{snippet.code.split('\n').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Código
          </h2>
        </div>
        <HighlightCode
          code={snippet.code}
          language={snippet.languages.name.toLowerCase()}
          showLineNumbers={true}
          showCopyButton={true}
          maxHeight="600px"
        />
      </div>
    </div>
  )
}
