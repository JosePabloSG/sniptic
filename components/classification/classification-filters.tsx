import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Category, Language, Framework } from '@/types/database'

interface ClassificationFiltersProps {
  categories: Category[]
  languages: Language[]
  frameworks: Framework[]
  onCategoryFilter: (categoryId: string) => void
  onLanguageFilter: (languageId: string) => void
  onClearFilters: () => void
  selectedCategory?: string
  selectedLanguage?: string
}

export function ClassificationFilters({
  categories,
  languages,
  frameworks,
  onCategoryFilter,
  onLanguageFilter,
  onClearFilters,
  selectedCategory,
  selectedLanguage
}: ClassificationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Filtrar por:</span>
      </div>

      <Select onValueChange={onCategoryFilter} value={selectedCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onLanguageFilter} value={selectedLanguage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Lenguaje" />
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

      {(selectedCategory || selectedLanguage) && (
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      )}

      <div className="flex flex-wrap gap-2 ml-auto">
        <Badge variant="secondary">
          Total categorías: {categories.length}
        </Badge>
        <Badge variant="secondary">
          Total lenguajes: {languages.length}
        </Badge>
        <Badge variant="secondary">
          Total frameworks: {frameworks.length}
        </Badge>
      </div>
    </div>
  )
}
