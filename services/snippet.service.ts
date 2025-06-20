import { createClient } from '@/utils/supabase/client'
import type { SnippetFormData } from '@/components/snippets/add-snippet-form'
import type { Snippet, SnippetWithRelations } from '@/types/database'

export class SnippetService {
  private supabase = createClient()

  /**
   * Crea un nuevo snippet
   */
  async createSnippet(userId: string, snippetData: SnippetFormData): Promise<Snippet> {
    const { data, error } = await this.supabase
      .from('snippets')
      .insert({
        user_id: userId,
        title: snippetData.title.trim(),
        code: snippetData.code.trim(),
        description: snippetData.description.trim() || null,
        language_id: snippetData.language_id,
        category_id: snippetData.category_id,
        framework_id: snippetData.framework_id || null,
        project_name: snippetData.project_name.trim() || null,
        tags: snippetData.tags.length > 0 ? snippetData.tags : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Error creating snippet: ${error.message}`)
    }

    return data
  }

  /**
   * Actualiza un snippet existente
   */
  async updateSnippet(snippetId: string, userId: string, snippetData: SnippetFormData): Promise<Snippet> {
    const { data, error } = await this.supabase
      .from('snippets')
      .update({
        title: snippetData.title.trim(),
        code: snippetData.code.trim(),
        description: snippetData.description.trim() || null,
        language_id: snippetData.language_id,
        category_id: snippetData.category_id,
        framework_id: snippetData.framework_id || null,
        project_name: snippetData.project_name.trim() || null,
        tags: snippetData.tags.length > 0 ? snippetData.tags : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', snippetId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Error updating snippet: ${error.message}`)
    }

    return data
  }

  /**
   * Elimina un snippet
   */
  async deleteSnippet(snippetId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('snippets')
      .delete()
      .eq('id', snippetId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Error deleting snippet: ${error.message}`)
    }
  }

  /**
   * Obtiene un snippet por ID
   */
  async getSnippet(snippetId: string, userId: string): Promise<SnippetWithRelations> {
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
      .eq('id', snippetId)
      .eq('user_id', userId)
      .single()

    if (error) {
      throw new Error(`Error fetching snippet: ${error.message}`)
    }

    return data
  }

  /**
   * Genera contenido Markdown de un snippet
   */
  generateMarkdown(snippet: SnippetWithRelations): string {
    return `# ${snippet.title}

${snippet.description ? `## Descripción\n${snippet.description}\n` : ''}

## Código

\`\`\`${snippet.languages.name.toLowerCase()}
${snippet.code}
\`\`\`

## Información

- **Lenguaje:** ${snippet.languages.name}
- **Categoría:** ${snippet.categories.name}
${snippet.frameworks ? `- **Framework:** ${snippet.frameworks.name}` : ''}
${snippet.project_name ? `- **Proyecto:** ${snippet.project_name}` : ''}

${snippet.tags && snippet.tags.length > 0 ? `## Tags\n${snippet.tags.map(tag => `- ${tag}`).join('\n')}` : ''}

---
*Creado: ${new Date(snippet.created_at).toLocaleDateString()}*
*Actualizado: ${new Date(snippet.updated_at).toLocaleDateString()}*`
  }

  /**
   * Exporta un snippet como archivo Markdown
   */
  exportAsMarkdown(snippet: SnippetWithRelations): void {
    const markdown = this.generateMarkdown(snippet)
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${snippet.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}
