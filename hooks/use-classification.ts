import { useState, useEffect } from 'react'
import { ClientClassificationService } from '@/services/client-classification.service'
import type { ClassificationData, SnippetWithRelations } from '@/types/database'

interface UseClassificationReturn {
  data: ClassificationData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  filterByCategory: (categoryId: string) => Promise<void>
  filterByLanguage: (languageId: string) => Promise<void>
  clearFilters: () => Promise<void>
}

export const useClassification = (userId: string): UseClassificationReturn => {
  const [data, setData] = useState<ClassificationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [originalSnippets, setOriginalSnippets] = useState<SnippetWithRelations[]>([])

  const classificationService = new ClientClassificationService()

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const classificationData = await classificationService.getClassificationData(userId)
      setData(classificationData)
      setOriginalSnippets(classificationData.snippets)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchData()
  }

  const filterByCategory = async (categoryId: string) => {
    try {
      setLoading(true)
      const filteredSnippets = await classificationService.getSnippetsByCategory(userId, categoryId)

      if (data) {
        setData({
          ...data,
          snippets: filteredSnippets
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al filtrar por categoría')
    } finally {
      setLoading(false)
    }
  }

  const filterByLanguage = async (languageId: string) => {
    try {
      setLoading(true)
      const filteredSnippets = await classificationService.getSnippetsByLanguage(userId, languageId)

      if (data) {
        setData({
          ...data,
          snippets: filteredSnippets
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al filtrar por lenguaje')
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = async () => {
    if (data && originalSnippets) {
      setData({
        ...data,
        snippets: originalSnippets
      })
    }
  }

  useEffect(() => {
    if (userId) {
      fetchData()
    }
  }, [userId])

  return {
    data,
    loading,
    error,
    refetch,
    filterByCategory,
    filterByLanguage,
    clearFilters
  }
}
