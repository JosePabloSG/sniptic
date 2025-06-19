import { useState } from 'react'
import { SnippetService } from '@/services/snippet.service'
import type { SnippetFormData } from '@/components/snippets/add-snippet-form'
import type { Snippet, SnippetWithRelations } from '@/types/database'

interface UseSnippetOperationsReturn {
  loading: boolean
  error: string | null
  createSnippet: (userId: string, data: SnippetFormData) => Promise<Snippet | null>
  updateSnippet: (snippetId: string, userId: string, data: SnippetFormData) => Promise<Snippet | null>
  deleteSnippet: (snippetId: string, userId: string) => Promise<boolean>
  getSnippet: (snippetId: string, userId: string) => Promise<SnippetWithRelations | null>
  exportSnippet: (snippet: SnippetWithRelations) => void
  clearError: () => void
}

export const useSnippetOperations = (): UseSnippetOperationsReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const snippetService = new SnippetService()

  const createSnippet = async (userId: string, data: SnippetFormData): Promise<Snippet | null> => {
    try {
      setLoading(true)
      setError(null)

      const snippet = await snippetService.createSnippet(userId, data)
      return snippet
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al crear snippet')
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateSnippet = async (snippetId: string, userId: string, data: SnippetFormData): Promise<Snippet | null> => {
    try {
      setLoading(true)
      setError(null)

      const snippet = await snippetService.updateSnippet(snippetId, userId, data)
      return snippet
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al actualizar snippet')
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteSnippet = async (snippetId: string, userId: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)

      await snippetService.deleteSnippet(snippetId, userId)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al eliminar snippet')
      return false
    } finally {
      setLoading(false)
    }
  }

  const getSnippet = async (snippetId: string, userId: string): Promise<SnippetWithRelations | null> => {
    try {
      setLoading(true)
      setError(null)

      const snippet = await snippetService.getSnippet(snippetId, userId)
      return snippet
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al obtener snippet')
      return null
    } finally {
      setLoading(false)
    }
  }

  const exportSnippet = (snippet: SnippetWithRelations) => {
    try {
      snippetService.exportAsMarkdown(snippet)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al exportar snippet')
    }
  }

  const clearError = () => {
    setError(null)
  }

  return {
    loading,
    error,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    getSnippet,
    exportSnippet,
    clearError
  }
}
