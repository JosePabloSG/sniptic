'use client'

import { useEffect, useRef } from 'react'
import Prism from 'prismjs'

// Import core Prism CSS
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

// Import line numbers plugin
import 'prismjs/plugins/line-numbers/prism-line-numbers'

// Import commonly used languages
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-jsx'

interface CodeHighlighterProps {
  code: string
  language: string
  showLineNumbers?: boolean
  maxHeight?: string
  fontSize?: string
  className?: string
}

export function CodeHighlighter({
  code,
  language,
  showLineNumbers = false,
  maxHeight,
  fontSize = '14px',
  className = ''
}: CodeHighlighterProps) {
  const codeRef = useRef<HTMLElement>(null)

  // Mapear nombres de lenguajes a identificadores de Prism
  const getLanguageForPrism = (languageName: string): string => {
    const languageMap: Record<string, string> = {
      'JavaScript': 'javascript',
      'TypeScript': 'typescript',
      'Python': 'python',
      'Java': 'java',
      'C++': 'cpp',
      'C#': 'csharp',
      'PHP': 'php',
      'Ruby': 'ruby',
      'Go': 'go',
      'Rust': 'rust',
      'Swift': 'swift',
      'Kotlin': 'kotlin',
      'HTML': 'html',
      'CSS': 'css',
      'SCSS': 'scss',
      'SQL': 'sql',
      'JSON': 'json',
      'XML': 'xml',
      'YAML': 'yaml',
      'Markdown': 'markdown',
      'Bash': 'bash',
      'PowerShell': 'powershell',
      'Dockerfile': 'docker',
      'Vue': 'javascript',
      'React': 'jsx',
      'Angular': 'typescript'
    }
    return languageMap[languageName] || 'text'
  }

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  const prismLanguage = getLanguageForPrism(language)
  const lineNumbersClass = showLineNumbers ? 'line-numbers' : ''

  return (
    <div
      className={`code-highlighter-wrapper ${className}`}
      style={{
        maxHeight,
        overflow: maxHeight ? 'auto' : 'visible'
      }}
    >
      <pre
        className={`language-${prismLanguage} ${lineNumbersClass}`}
        style={{
          margin: 0,
          fontSize,
          background: '#2d3748',
          borderRadius: '0.5rem'
        }}
      >
        <code
          ref={codeRef}
          className={`language-${prismLanguage}`}
        >
          {code}
        </code>
      </pre>
    </div>
  )
}
