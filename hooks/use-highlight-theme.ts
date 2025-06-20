import { useEffect, useState } from 'react'

export type HighlightTheme =
  | 'github-dark'
  | 'github'
  | 'monokai'
  | 'atom-one-dark'
  | 'atom-one-light'
  | 'vs2015'
  | 'vs'
  | 'rainbow'
  | 'androidstudio'

const themeMap: Record<HighlightTheme, string> = {
  'github-dark': 'highlight.js/styles/github-dark.css',
  'github': 'highlight.js/styles/github.css',
  'monokai': 'highlight.js/styles/monokai.css',
  'atom-one-dark': 'highlight.js/styles/atom-one-dark.css',
  'atom-one-light': 'highlight.js/styles/atom-one-light.css',
  'vs2015': 'highlight.js/styles/vs2015.css',
  'vs': 'highlight.js/styles/vs.css',
  'rainbow': 'highlight.js/styles/rainbow.css',
  'androidstudio': 'highlight.js/styles/androidstudio.css'
}

export function useHighlightTheme(theme: HighlightTheme = 'github-dark') {
  const [currentTheme, setCurrentTheme] = useState<HighlightTheme>(theme)

  useEffect(() => {
    // Remove existing highlight.js stylesheets
    const existingLinks = document.querySelectorAll('link[href*="highlight.js/styles"]')
    existingLinks.forEach(link => link.remove())

    // Add new theme stylesheet
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${theme}.min.css`
    document.head.appendChild(link)

    setCurrentTheme(theme)

    return () => {
      link.remove()
    }
  }, [theme])

  return { currentTheme, setTheme: setCurrentTheme }
}
