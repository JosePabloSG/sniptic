'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Copy, Check, Code2, Calendar, Search, Filter } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { classificationService } from '@/services/client-classification.service'
import { HighlightCode } from '@/components/ui/highlight-code'
import type { SnippetWithRelations } from '@/types/database'

interface ProjectDetailViewProps {
  projectName: string
}

export function ProjectDetailView({ projectName }: ProjectDetailViewProps) {
  const [snippets, setSnippets] = useState<SnippetWithRelations[]>([])
  const [filteredSnippets, setFilteredSnippets] = useState<SnippetWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [languageFilter, setLanguageFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [copiedSnippets, setCopiedSnippets] = useState<Set<string>>(new Set())
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      loadProjectSnippets()
    }
  }, [user, projectName])

  useEffect(() => {
    filterSnippets()
  }, [snippets, searchTerm, languageFilter, categoryFilter])

  const loadProjectSnippets = async () => {
    try {
      setLoading(true)
      const allSnippets = await classificationService.getSnippetsWithRelations(user!.id)

      // Filter snippets by project name
      const projectSnippets = allSnippets.filter((snippet: SnippetWithRelations) =>
        (snippet.project_name || 'Sin Proyecto') === projectName
      )

      setSnippets(projectSnippets)
    } catch (error) {
      console.error('Error loading project snippets:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterSnippets = () => {
    let filtered = snippets

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by language
    if (languageFilter !== 'all') {
      filtered = filtered.filter(snippet => snippet.languages.name === languageFilter)
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(snippet => snippet.categories.name === categoryFilter)
    }

    setFilteredSnippets(filtered)
  }

  const handleCopyCode = async (snippet: SnippetWithRelations) => {
    try {
      await navigator.clipboard.writeText(snippet.code)
      setCopiedSnippets(prev => new Set([...prev, snippet.id]))
      setTimeout(() => {
        setCopiedSnippets(prev => {
          const newSet = new Set(prev)
          newSet.delete(snippet.id)
          return newSet
        })
      }, 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  // Get unique languages and categories for filters
  const uniqueLanguages = Array.from(new Set(snippets.map(s => s.languages.name)))
  const uniqueCategories = Array.from(new Set(snippets.map(s => s.categories.name)))

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Snippets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{snippets.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lenguajes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueLanguages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCategories.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Última Actualización</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {snippets.length > 0 && new Date(
                Math.max(...snippets.map(s => new Date(s.updated_at).getTime()))
              ).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar snippets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por lenguaje" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los lenguajes</SelectItem>
                {uniqueLanguages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {uniqueCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSnippets.map((snippet) => (
          <Card key={snippet.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <Link
                    href={`/dashboard/projects/${encodeURIComponent(projectName)}/${snippet.id}`}
                    className="hover:underline"
                  >
                    <CardTitle className="text-lg hover:text-primary transition-colors">
                      {snippet.title}
                    </CardTitle>
                  </Link>
                  {snippet.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopyCode(snippet)}
                  className="ml-2 shrink-0"
                >
                  {copiedSnippets.has(snippet.id) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{snippet.categories.name}</Badge>
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

                {/* Code Preview */}
                <div className="rounded-lg overflow-hidden">
                  <HighlightCode
                    code={snippet.code.slice(0, 200) + (snippet.code.length > 200 ? '...' : '')}
                    language={snippet.languages.name.toLowerCase()}
                    showLineNumbers={false}
                    showCopyButton={false}
                    maxHeight="100px"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(snippet.updated_at).toLocaleDateString()}</span>
                  </div>
                  <Link
                    href={`/dashboard/projects/${encodeURIComponent(projectName)}/${snippet.id}`}
                    className="text-primary hover:underline"
                  >
                    Ver detalle →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSnippets.length === 0 && !loading && (
        <div className="text-center py-12">
          <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">
            No se encontraron snippets
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {searchTerm || languageFilter !== 'all' || categoryFilter !== 'all'
              ? 'Prueba con diferentes filtros'
              : 'Este proyecto aún no tiene snippets'
            }
          </p>
        </div>
      )}
    </div>
  )
}
