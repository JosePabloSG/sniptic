import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Copy, Check, Code2, Calendar, Tag, FolderOpen, FileText } from 'lucide-react'
import { HighlightCode } from '@/components/ui/highlight-code'
import type { SnippetWithRelations } from '@/types/database'

interface ProjectGroup {
  projectName: string
  snippets: SnippetWithRelations[]
  technologies: Array<{
    name: string
    color?: string
    type: 'language' | 'framework'
  }>
}

interface SnippetDetailModalProps {
  project: ProjectGroup
  isOpen: boolean
  onClose: () => void
}

export function SnippetDetailModal({ project, isOpen, onClose }: SnippetDetailModalProps) {
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetWithRelations | null>(null)
  const [copiedSnippets, setCopiedSnippets] = useState<Set<string>>(new Set())

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            {project.projectName}
            <Badge variant="secondary" className="ml-2">
              {project.snippets.length} snippet{project.snippets.length !== 1 ? 's' : ''}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Vista General</TabsTrigger>
              <TabsTrigger value="snippets">Snippets</TabsTrigger>
              <TabsTrigger value="detail" disabled={!selectedSnippet}>
                Detalle {selectedSnippet && `- ${selectedSnippet.title}`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <div className="space-y-6 h-full">
                {/* Project Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Snippets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{project.snippets.length}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Tecnologías</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{project.technologies.length}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Última Actualización</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        {new Date(
                          Math.max(...project.snippets.map(s => new Date(s.updated_at).getTime()))
                        ).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tecnologías Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={`${tech.name}-${index}`}
                        variant={tech.type === 'language' ? 'default' : 'outline'}
                        className="text-sm px-3 py-1"
                        style={
                          tech.type === 'language' && tech.color
                            ? { backgroundColor: tech.color + '20', borderColor: tech.color, color: tech.color }
                            : undefined
                        }
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recent Snippets */}
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-lg font-semibold mb-3">Snippets Recientes</h3>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {project.snippets
                        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                        .slice(0, 10)
                        .map((snippet) => (
                          <Card
                            key={snippet.id}
                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => {
                              setSelectedSnippet(snippet)
                              // Switch to detail tab
                              const detailTab = document.querySelector('[value="detail"]') as HTMLElement
                              detailTab?.click()
                            }}
                          >
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{snippet.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary">{snippet.categories.name}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(snippet.updated_at).toLocaleDateString()}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="snippets" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {project.snippets.map((snippet) => (
                    <Card key={snippet.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{snippet.title}</CardTitle>
                            {snippet.description && (
                              <p className="text-sm text-muted-foreground">{snippet.description}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyCode(snippet)}
                            className="ml-2"
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
                              <Badge variant="outline">{snippet.frameworks.name}</Badge>
                            )}
                            {snippet.tags?.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Code Preview */}
                          <div className="rounded-lg overflow-hidden">
                            <HighlightCode
                              code={snippet.code.slice(0, 300) + (snippet.code.length > 300 ? '...' : '')}
                              language={snippet.languages.name.toLowerCase()}
                              showLineNumbers={false}
                              showCopyButton={false}
                              maxHeight="120px"
                            />
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(snippet.created_at).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Code2 className="h-3 w-3" />
                                {snippet.code.split('\n').length} líneas
                              </span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedSnippet(snippet)
                                const detailTab = document.querySelector('[value="detail"]') as HTMLElement
                                detailTab?.click()
                              }}
                            >
                              Ver detalle
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="detail" className="flex-1 overflow-hidden">
              {selectedSnippet ? (
                <div className="h-full space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{selectedSnippet.title}</h3>
                    <Button
                      onClick={() => handleCopyCode(selectedSnippet)}
                      className="flex items-center gap-2"
                    >
                      {copiedSnippets.has(selectedSnippet.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      Copiar código
                    </Button>
                  </div>

                  {selectedSnippet.description && (
                    <p className="text-muted-foreground">{selectedSnippet.description}</p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{selectedSnippet.categories.name}</Badge>
                    <Badge
                      variant="outline"
                      style={{ borderColor: selectedSnippet.languages.color || '#6b7280' }}
                    >
                      {selectedSnippet.languages.name}
                    </Badge>
                    {selectedSnippet.frameworks && (
                      <Badge variant="outline">{selectedSnippet.frameworks.name}</Badge>
                    )}
                    {selectedSnippet.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Full Code */}
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Código Completo
                    </h4>
                    <HighlightCode
                      code={selectedSnippet.code}
                      language={selectedSnippet.languages.name.toLowerCase()}
                      showLineNumbers={true}
                      showCopyButton={true}
                      maxHeight="400px"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Creado:</span>{' '}
                        {new Date(selectedSnippet.created_at).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Actualizado:</span>{' '}
                        {new Date(selectedSnippet.updated_at).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Líneas de código:</span>{' '}
                        {selectedSnippet.code.split('\n').length}
                      </div>
                      <div>
                        <span className="font-medium">Caracteres:</span>{' '}
                        {selectedSnippet.code.length}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Code2 className="h-12 w-12 mx-auto mb-4" />
                    <p>Selecciona un snippet para ver los detalles</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
