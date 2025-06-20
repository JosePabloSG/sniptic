'use client'

import { useState } from 'react'
import { useUser } from '@/hooks/use-user'
import { useClassification } from '@/hooks/use-classification'
import { ClassificationFilters } from '@/components/classification/classification-filters'
import { ClassificationStats } from '@/components/classification/classification-stats'
import { SnippetGrid } from '@/components/classification/snippet-grid'
import { ProjectGrid } from '@/components/classification/project-grid'
import { JsonViewer } from '@/components/classification/json-viewer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/classification/empty-state'
import { ClassificationSkeleton } from '@/components/classification/classification-skeleton'
import { AddSnippetModal } from '@/components/snippets/add-snippet-modal'
import { RefreshCw, AlertCircle } from 'lucide-react'

export default function ClassificationPage() {
  const { user } = useUser()
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [selectedLanguage, setSelectedLanguage] = useState<string>()

  const {
    data,
    loading,
    error,
    refetch,
    filterByCategory,
    filterByLanguage,
    clearFilters
  } = useClassification(user?.id || '')

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedLanguage(undefined)
    filterByCategory(categoryId)
  }

  const handleLanguageFilter = (languageId: string) => {
    setSelectedLanguage(languageId)
    setSelectedCategory(undefined)
    filterByLanguage(languageId)
  }

  const handleClearFilters = () => {
    setSelectedCategory(undefined)
    setSelectedLanguage(undefined)
    clearFilters()
  }

  if (!user) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Acceso requerido</h2>
            <p className="text-muted-foreground">
              Debes iniciar sesión para ver tus snippets clasificados
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Error al cargar datos</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="flex justify-center">
              <Button onClick={refetch} className=" flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mostrar estado vacío si no hay datos y no estamos cargando
  if (!loading && !data) {
    return (
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Clasificación</h1>
          <p className="text-muted-foreground mt-2">
            Explora y filtra tus snippets por categoría, lenguaje y framework
          </p>
        </div>
        <EmptyState
          categories={[]}
          languages={[]}
          frameworks={[]}
          onSnippetAdded={refetch}
        />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Clasificación</h1>
          <p className="text-muted-foreground mt-2">
            Explora y filtra tus snippets por categoría, lenguaje y framework
          </p>
        </div>
        <div className="flex items-center gap-2">
          {data && (
            <AddSnippetModal
              categories={data.categories}
              languages={data.languages}
              frameworks={data.frameworks}
              onSnippetAdded={refetch}
            />
          )}
          <Button
            onClick={refetch}
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>
      </div>

      {data && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Biblioteca</TabsTrigger>
            <TabsTrigger value="snippets">Lista Completa</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="json">Datos JSON</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ClassificationFilters
              categories={data.categories}
              languages={data.languages}
              frameworks={data.frameworks}
              onCategoryFilter={handleCategoryFilter}
              onLanguageFilter={handleLanguageFilter}
              onClearFilters={handleClearFilters}
              selectedCategory={selectedCategory}
              selectedLanguage={selectedLanguage}
            />

            <ClassificationStats statistics={data.statistics} />

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Biblioteca de Snippets
                {(selectedCategory || selectedLanguage) && (
                  <span className="text-base font-normal text-muted-foreground ml-2">
                    (Filtrados: {data.snippets.length})
                  </span>
                )}
              </h2>
              <ProjectGrid snippets={data.snippets} loading={loading} />
            </div>
          </TabsContent>

          <TabsContent value="snippets" className="space-y-6">
            <ClassificationFilters
              categories={data.categories}
              languages={data.languages}
              frameworks={data.frameworks}
              onCategoryFilter={handleCategoryFilter}
              onLanguageFilter={handleLanguageFilter}
              onClearFilters={handleClearFilters}
              selectedCategory={selectedCategory}
              selectedLanguage={selectedLanguage}
            />

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Todos los Snippets
                {(selectedCategory || selectedLanguage) && (
                  <span className="text-base font-normal text-muted-foreground ml-2">
                    (Filtrados: {data.snippets.length})
                  </span>
                )}
              </h2>
              <SnippetGrid snippets={data.snippets} loading={loading} />
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <ClassificationStats statistics={data.statistics} />
          </TabsContent>

          <TabsContent value="json" className="space-y-6">
            <JsonViewer data={data} />
          </TabsContent>
        </Tabs>
      )}

      {loading && !data && <ClassificationSkeleton />}
    </div>
  )
}
