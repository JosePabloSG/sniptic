export interface Snippet {
  id: string
  user_id: string
  title: string
  code: string
  description?: string
  language_id: string
  category_id: string
  framework_id?: string
  project_name?: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  created_at?: string
}

export interface Language {
  id: string
  name: string
  color?: string
  icon_url?: string
  created_at?: string
}

export interface Framework {
  id: string
  name: string
  language_id: string
  created_at?: string
}

export interface SnippetWithRelations extends Snippet {
  categories: Category
  languages: Language
  frameworks?: Framework
}

export interface ClassificationData {
  snippets: SnippetWithRelations[]
  categories: Category[]
  languages: Language[]
  frameworks: Framework[]
  statistics: {
    totalSnippets: number
    snippetsByCategory: { [key: string]: number }
    snippetsByLanguage: { [key: string]: number }
    snippetsByFramework: { [key: string]: number }
  }
}
