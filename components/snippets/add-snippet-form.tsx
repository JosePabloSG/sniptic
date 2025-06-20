import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HighlightCode } from '@/components/ui/highlight-code'
import { X, Plus, Save, Eye, Code } from 'lucide-react'
import type { Category, Language, Framework } from '@/types/database'

interface AddSnippetFormProps {
  categories: Category[]
  languages: Language[]
  frameworks: Framework[]
  onSubmit: (snippet: SnippetFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export interface SnippetFormData {
  title: string
  description: string
  code: string
  language_id: string
  category_id: string
  framework_id?: string
  project_name: string
  tags: string[]
}

export function AddSnippetForm({
  categories,
  languages,
  frameworks,
  onSubmit,
  onCancel,
  loading = false
}: AddSnippetFormProps) {
  const [formData, setFormData] = useState<SnippetFormData>({
    title: '',
    description: '',
    code: '',
    language_id: '',
    category_id: '',
    framework_id: '',
    project_name: '',
    tags: []
  })

  const [tagInput, setTagInput] = useState('')
  const [activeTab, setActiveTab] = useState('editor')

  // Filtrar frameworks basado en el lenguaje seleccionado
  const availableFrameworks = frameworks.filter(
    framework => framework.language_id === formData.language_id
  )

  const handleInputChange = (field: keyof SnippetFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.code.trim() || !formData.language_id || !formData.category_id) {
      return
    }

    await onSubmit(formData)
  }

  const isValid = formData.title.trim() && formData.code.trim() && formData.language_id && formData.category_id

  // Helper function to get language name from ID
  const getLanguageName = (languageId: string): string => {
    const language = languages.find(lang => lang.id === languageId)
    return language?.name.toLowerCase() || 'javascript'
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Ej: React useState Hook"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">Proyecto</Label>
            <Input
              id="project"
              placeholder="Ej: Mi App React"
              value={formData.project_name}
              onChange={(e) => handleInputChange('project_name', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            placeholder="Describe qué hace este snippet..."
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
            rows={2}
          />
        </div>

        {/* Clasificación */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Lenguaje *</Label>
            <Select
              value={formData.language_id}
              onValueChange={(value) => {
                handleInputChange('language_id', value)
                // Reset framework when language changes
                if (formData.framework_id) {
                  handleInputChange('framework_id', '')
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar lenguaje" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.id} value={language.id}>
                    <div className="flex items-center gap-2">
                      {language.color && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: language.color }}
                        />
                      )}
                      {language.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Categoría *</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => handleInputChange('category_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Framework</Label>
            <Select
              value={formData.framework_id}
              onValueChange={(value) => handleInputChange('framework_id', value)}
              disabled={!formData.language_id || availableFrameworks.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar framework" />
              </SelectTrigger>
              <SelectContent>
                {availableFrameworks.map((framework) => (
                  <SelectItem key={framework.id} value={framework.id}>
                    {framework.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Agregar tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button type="button" onClick={handleAddTag} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Editor de código con tabs */}
        <div className="space-y-2">
          <Label>Código *</Label>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Vista Previa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="mt-2">
              <Textarea
                placeholder="Pega tu código aquí..."
                value={formData.code}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('code', e.target.value)}
                rows={12}
                className="font-mono text-sm"
                required
              />
            </TabsContent>

            <TabsContent value="preview" className="mt-2">
              <div className="min-h-[300px]">
                {formData.code ? (
                  <HighlightCode
                    code={formData.code}
                    language={getLanguageName(formData.language_id)}
                    showLineNumbers={true}
                    showCopyButton={false}
                    maxHeight="400px"
                  />
                ) : (
                  <div className="border rounded-md p-8 bg-muted/30 min-h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Escribe tu código en el editor para ver la vista previa con resaltado de sintaxis
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!isValid || loading}>
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar Snippet
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
