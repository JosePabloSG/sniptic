import { createClient } from '@/utils/supabase/client'
import type {
  Snippet,
  Category,
  Language,
  Framework,
  SnippetWithRelations,
  ClassificationData
} from '@/types/database'

/**
 * Servicio de clasificación para uso exclusivo del lado del cliente
 */
export class ClientClassificationService {
  private supabase = createClient()

  /**
   * Obtiene todos los snippets con sus relaciones
   */
  async getSnippetsWithRelations(userId: string): Promise<SnippetWithRelations[]> {
    const { data, error } = await this.supabase
      .from('snippets')
      .select(`
        *,
        categories (
          id,
          name,
          description
        ),
        languages (
          id,
          name,
          color,
          icon_url
        ),
        frameworks (
          id,
          name,
          language_id
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error fetching snippets: ${error.message}`)
    }

    return data || []
  }

  /**
   * Obtiene todas las categorías
   */
  async getCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) {
      throw new Error(`Error fetching categories: ${error.message}`)
    }

    return data || []
  }

  /**
   * Obtiene todos los lenguajes
   */
  async getLanguages(): Promise<Language[]> {
    const { data, error } = await this.supabase
      .from('languages')
      .select('*')
      .order('name')

    if (error) {
      throw new Error(`Error fetching languages: ${error.message}`)
    }

    return data || []
  }

  /**
   * Obtiene todos los frameworks
   */
  async getFrameworks(): Promise<Framework[]> {
    const { data, error } = await this.supabase
      .from('frameworks')
      .select('*')
      .order('name')

    if (error) {
      throw new Error(`Error fetching frameworks: ${error.message}`)
    }

    return data || []
  }

  /**
   * Obtiene estadísticas de clasificación
   */
  async getClassificationStatistics(userId: string) {
    const snippets = await this.getSnippetsWithRelations(userId)

    const statistics = {
      totalSnippets: snippets.length,
      snippetsByCategory: {} as { [key: string]: number },
      snippetsByLanguage: {} as { [key: string]: number },
      snippetsByFramework: {} as { [key: string]: number },
    }

    snippets.forEach(snippet => {
      // Contar por categoría
      const categoryName = snippet.categories.name
      statistics.snippetsByCategory[categoryName] =
        (statistics.snippetsByCategory[categoryName] || 0) + 1

      // Contar por lenguaje
      const languageName = snippet.languages.name
      statistics.snippetsByLanguage[languageName] =
        (statistics.snippetsByLanguage[languageName] || 0) + 1

      // Contar por framework (si existe)
      if (snippet.frameworks) {
        const frameworkName = snippet.frameworks.name
        statistics.snippetsByFramework[frameworkName] =
          (statistics.snippetsByFramework[frameworkName] || 0) + 1
      }
    })

    return statistics
  }

  /**
   * Obtiene todos los datos necesarios para la página de clasificación
   */
  async getClassificationData(userId: string): Promise<ClassificationData> {
    try {
      const [snippets, categories, languages, frameworks] = await Promise.all([
        this.getSnippetsWithRelations(userId),
        this.getCategories(),
        this.getLanguages(),
        this.getFrameworks()
      ])

      const statistics = await this.getClassificationStatistics(userId)

      return {
        snippets,
        categories,
        languages,
        frameworks,
        statistics
      }
    } catch (error) {
      throw new Error(`Error fetching classification data: ${error}`)
    }
  }

  /**
   * Filtra snippets por categoría
   */
  async getSnippetsByCategory(userId: string, categoryId: string): Promise<SnippetWithRelations[]> {
    const { data, error } = await this.supabase
      .from('snippets')
      .select(`
        *,
        categories (
          id,
          name,
          description
        ),
        languages (
          id,
          name,
          color,
          icon_url
        ),
        frameworks (
          id,
          name,
          language_id
        )
      `)
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error fetching snippets by category: ${error.message}`)
    }

    return data || []
  }

  /**
   * Filtra snippets por lenguaje
   */
  async getSnippetsByLanguage(userId: string, languageId: string): Promise<SnippetWithRelations[]> {
    const { data, error } = await this.supabase
      .from('snippets')
      .select(`
        *,
        categories (
          id,
          name,
          description
        ),
        languages (
          id,
          name,
          color,
          icon_url
        ),
        frameworks (
          id,
          name,
          language_id
        )
      `)
      .eq('user_id', userId)
      .eq('language_id', languageId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error fetching snippets by language: ${error.message}`)
    }

    return data || []
  }
}

// Export a ready-to-use instance for client-side usage
export const classificationService = new ClientClassificationService()
