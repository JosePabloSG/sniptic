'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette } from 'lucide-react'
import { useHighlightTheme, type HighlightTheme } from '@/hooks/use-highlight-theme'
import { HighlightCode } from './highlight-code'

const themes: { value: HighlightTheme; label: string }[] = [
  { value: 'github-dark', label: 'GitHub Dark' },
  { value: 'github', label: 'GitHub Light' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'atom-one-dark', label: 'Atom One Dark' },
  { value: 'atom-one-light', label: 'Atom One Light' },
  { value: 'vs2015', label: 'Visual Studio 2015' },
  { value: 'vs', label: 'Visual Studio' },
  { value: 'rainbow', label: 'Rainbow' },
  { value: 'androidstudio', label: 'Android Studio' }
]

const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Usage example
const result = fibonacci(10);
console.log('Fibonacci of 10 is:', result);

// Class example
class Calculator {
  constructor() {
    this.history = [];
  }
  
  add(a, b) {
    const result = a + b;
    this.history.push(\`\${a} + \${b} = \${result}\`);
    return result;
  }
}`

interface CodeThemeSelectorProps {
  onThemeChange?: (theme: HighlightTheme) => void
}

export function CodeThemeSelector({ onThemeChange }: CodeThemeSelectorProps) {
  const { currentTheme, setTheme } = useHighlightTheme()
  const [selectedTheme, setSelectedTheme] = useState<HighlightTheme>(currentTheme)

  const handleThemeChange = (theme: HighlightTheme) => {
    setSelectedTheme(theme)
    setTheme(theme)
    onThemeChange?.(theme)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Selector de Tema de Código
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Select value={selectedTheme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecciona un tema" />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  {theme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Tema actual: {themes.find(t => t.value === currentTheme)?.label}
          </span>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Vista previa:</h4>
          <HighlightCode
            code={sampleCode}
            language="javascript"
            showLineNumbers={true}
            showCopyButton={true}
            maxHeight="300px"
          />
        </div>
      </CardContent>
    </Card>
  )
}
