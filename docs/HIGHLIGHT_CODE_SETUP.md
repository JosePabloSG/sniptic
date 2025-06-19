# Documentación: Resaltado de Código con Highlight.js

## Características

✅ **Nuevo componente `HighlightCode`** instalado y configurado con highlight.js
✅ **Detección automática de lenguaje** cuando no se especifica
✅ **Numeración de líneas** opcional
✅ **Botón de copiar integrado** con feedback visual
✅ **Múltiples temas** disponibles
✅ **Optimización de bundle** - solo se cargan los lenguajes necesarios
✅ **Scroll personalizado** y diseño responsivo
✅ **Integración perfecta** con tu sistema de diseño existente

## Componentes Actualizados

### 1. `HighlightCode` (Nuevo)

Ubicación: `/components/ui/highlight-code.tsx`

**Uso básico:**

```tsx
import { HighlightCode } from "@/components/ui/highlight-code";

<HighlightCode
  code={snippet.code}
  language="javascript"
  showLineNumbers={true}
  showCopyButton={true}
  maxHeight="500px"
/>;
```

**Props disponibles:**

- `code: string` - El código a resaltar
- `language?: string` - Lenguaje (ej: 'javascript', 'python', 'typescript')
- `showLineNumbers?: boolean` - Mostrar números de línea (default: true)
- `showCopyButton?: boolean` - Mostrar botón copiar (default: true)
- `className?: string` - Clases CSS adicionales
- `maxHeight?: string` - Altura máxima del contenedor (default: '500px')

### 2. Componentes Actualizados

- ✅ **`snippet-detail-view.tsx`** - Vista de detalle de snippet con resaltado mejorado
- ✅ **`snippet-detail-modal.tsx`** - Modal de detalle con preview y código completo
- ✅ **`project-detail-view.tsx`** - Vista de proyecto con previews de código mejorados

## Lenguajes Soportados

El sistema incluye soporte optimizado para:

- **JavaScript/TypeScript** (js, jsx, ts, tsx)
- **Python** (py)
- **Java** (java)
- **C/C++** (c, cpp, c++)
- **C#** (cs, csharp)
- **PHP** (php)
- **Ruby** (rb, ruby)
- **Go** (go, golang)
- **Rust** (rs, rust)
- **Swift** (swift)
- **Kotlin** (kt, kotlin)
- **CSS/SCSS** (css, scss, sass)
- **HTML/XML** (html, xml)
- **JSON** (json)
- **YAML** (yaml, yml)
- **Markdown** (md, markdown)
- **Bash/Shell** (bash, sh, shell)
- **SQL** (sql)
- **Dockerfile** (dockerfile)

## Utilidades Adicionales

### `getLanguageFromExtension(filename: string)`

Función helper para detectar el lenguaje basado en la extensión del archivo:

```tsx
import { getLanguageFromExtension } from "@/components/ui/highlight-code";

const language = getLanguageFromExtension("app.js"); // 'javascript'
const language2 = getLanguageFromExtension("script.py"); // 'python'
```

### `CodeThemeSelector` (Opcional)

Componente para cambiar temas de resaltado dinámicamente:

```tsx
import { CodeThemeSelector } from "@/components/ui/code-theme-selector";

<CodeThemeSelector
  onThemeChange={(theme) => console.log("New theme:", theme)}
/>;
```

## Temas Disponibles

- `github-dark` (default)
- `github`
- `monokai`
- `atom-one-dark`
- `atom-one-light`
- `vs2015`
- `vs`
- `rainbow`
- `androidstudio`

## Personalización

### Cambiar el tema por defecto

Edita `/components/ui/highlight-code.tsx` línea 8:

```tsx
import "highlight.js/styles/monokai.css"; // Cambia github-dark.css por tu tema preferido
```

### Agregar más lenguajes

Edita `/lib/highlight-config.ts` y agrega:

```tsx
import newLanguage from "highlight.js/lib/languages/new-language";
hljs.registerLanguage("new-language", newLanguage);
```

## Rendimiento

- ✅ **Bundle optimizado**: Solo se cargan los lenguajes que necesitas
- ✅ **Lazy loading**: Los estilos se cargan dinámicamente
- ✅ **Tree shaking**: Highlight.js se importa modularmente
- ✅ **Caching**: Los temas se cachean automáticamente

## Migración

Si tenías código usando el antiguo `CodeHighlighter` (Prism.js), simplemente reemplaza:

```tsx
// Antes (Prism.js)
<CodeHighlighter
  code={code}
  language={language}
  showLineNumbers={true}
/>

// Ahora (Highlight.js)
<HighlightCode
  code={code}
  language={language}
  showLineNumbers={true}
  showCopyButton={true}
/>
```

## Ejemplos de Uso

### Vista de Snippet Simple

```tsx
<HighlightCode code="console.log('Hello World!')" language="javascript" />
```

### Vista de Snippet con Todas las Opciones

```tsx
<HighlightCode
  code={snippet.code}
  language={snippet.language.toLowerCase()}
  showLineNumbers={true}
  showCopyButton={true}
  maxHeight="600px"
  className="rounded-lg shadow-lg"
/>
```

### Preview de Código (Sin Líneas ni Copiar)

```tsx
<HighlightCode
  code={code.slice(0, 200) + "..."}
  language="auto"
  showLineNumbers={false}
  showCopyButton={false}
  maxHeight="120px"
/>
```
