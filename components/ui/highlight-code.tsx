'use client'

import { useEffect, useRef, useState } from 'react'
import hljs from '@/lib/highlight-config'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Import custom highlight.js theme
import '@/styles/highlight-custom.css'

interface HighlightCodeProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  className?: string
  maxHeight?: string
}

export function HighlightCode({
  code,
  language = 'javascript',
  showLineNumbers = true,
  showCopyButton = true,
  className = '',
  maxHeight = '500px'
}: HighlightCodeProps) {
  const codeRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState<string>(language)

  useEffect(() => {
    if (codeRef.current) {
      // Clear any existing highlighting
      codeRef.current.removeAttribute('data-highlighted')

      // Detect language if not provided or if it's a generic language
      if (!language || language === 'text' || language === 'plain') {
        const detection = hljs.highlightAuto(code)
        setDetectedLanguage(detection.language || 'javascript')
        codeRef.current.innerHTML = detection.value
      } else {
        // Use specified language
        try {
          const result = hljs.highlight(code, { language: detectedLanguage })
          codeRef.current.innerHTML = result.value
          setDetectedLanguage(detectedLanguage)
        } catch {
          // Fallback to auto-detection if language is not supported
          const detection = hljs.highlightAuto(code)
          codeRef.current.innerHTML = detection.value
          setDetectedLanguage(detection.language || 'javascript')
        }
      }
    }
  }, [code, language, detectedLanguage])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error('Error copying code')
    }
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Code container with integrated header */}
      <div
        className="relative overflow-auto bg-[#0d1117] border border-gray-800 rounded-lg"
        style={{ maxHeight }}
      >
        {/* Floating copy button and language indicator */}
        {showCopyButton && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            <span className="text-xs text-gray-400 font-mono uppercase tracking-wide bg-gray-800/50 px-2 py-1 rounded backdrop-blur-sm">
              {detectedLanguage}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-2 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/70 backdrop-blur-sm border border-gray-700/50"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  <span className="text-xs">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  <span className="text-xs">Copiar</span>
                </>
              )}
            </Button>
          </div>
        )}

        <pre className={`hljs p-4 m-0 text-sm leading-relaxed bg-transparent ${showLineNumbers ? 'line-numbers' : ''}`}>
          <code
            ref={codeRef}
            className={`hljs language-${detectedLanguage} block bg-transparent`}
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              background: 'transparent'
            }}
          >
            {code}
          </code>
        </pre>

        {/* Line numbers overlay */}
        {showLineNumbers && (
          <div className="absolute left-0 top-0 p-4 text-gray-500 text-sm leading-relaxed pointer-events-none select-none border-r border-gray-800/50">
            {code.split('\n').map((_, index) => (
              <div key={index} className="text-right pr-4 min-w-[2.5rem]" style={{ lineHeight: '1.6' }}>
                {index + 1}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .line-numbers {
          padding-left: 4rem;
        }
        
        .line-numbers .line-number {
          position: relative;
        }
        
        .line-numbers .line-number::before {
          content: attr(data-line);
          position: absolute;
          left: -3.5rem;
          width: 3rem;
          text-align: right;
          color: #7d8590;
          font-size: 12px;
          line-height: inherit;
          opacity: 0.8;
        }
        
        /* Custom scrollbar matching GitHub dark theme */
        .hljs::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .hljs::-webkit-scrollbar-track {
          background: #21262d;
        }
        
        .hljs::-webkit-scrollbar-thumb {
          background: #484f58;
          border-radius: 4px;
        }
        
        .hljs::-webkit-scrollbar-thumb:hover {
          background: #6e7681;
        }
        
        /* Ensure background consistency */
        .hljs {
          background: #0d1117 !important;
          border-radius: 0;
        }
        
        /* Floating elements backdrop */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  )
}

// Language mapping helper
export const getLanguageFromExtension = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase()

  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    cs: 'csharp',
    php: 'php',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    swift: 'swift',
    kt: 'kotlin',
    css: 'css',
    scss: 'scss',
    sass: 'scss',
    html: 'html',
    xml: 'xml',
    json: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    md: 'markdown',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    ps1: 'powershell',
    sql: 'sql',
    dockerfile: 'dockerfile',
    vue: 'vue',
    svelte: 'svelte'
  }

  return languageMap[extension || ''] || 'javascript'
}
