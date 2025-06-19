# Arquitectura de Clasificación y Gestión de Snippets

Esta implementación sigue una arquitectura modular, escalable y reutilizable para el manejo completo de snippets: visualización, clasificación, creación y gestión con soporte para Markdown.

## 📁 Estructura del Proyecto

```
├── types/
│   └── database.ts              # Tipos e interfaces de la base de datos
├── services/
│   ├── classification.service.ts # Servicio para consultas de clasificación
│   ├── client-classification.service.ts # Servicio cliente para clasificación
│   └── snippet.service.ts       # Servicio para operaciones CRUD de snippets
├── hooks/
│   ├── use-classification.ts    # Hook para manejo de clasificación
│   └── use-snippet-operations.ts # Hook para operaciones de snippets
├── components/
│   ├── classification/
│   │   ├── index.ts             # Exportaciones de clasificación
│   │   ├── snippet-card.tsx     # Tarjeta de snippet con acciones
│   │   ├── classification-filters.tsx # Filtros avanzados
│   │   ├── classification-stats.tsx # Estadísticas completas
│   │   ├── snippet-grid.tsx     # Grid responsive
│   │   ├── json-viewer.tsx      # Visor JSON para debugging
│   │   ├── empty-state.tsx      # Estado vacío con acciones
│   │   └── classification-skeleton.tsx # Loading states
│   ├── snippets/
│   │   ├── index.ts             # Exportaciones de snippets
│   │   ├── add-snippet-form.tsx # Formulario completo de creación
│   │   └── add-snippet-modal.tsx # Modal para agregar snippets
│   └── ui/
│       ├── textarea.tsx         # Componente textarea
│       └── dialog.tsx           # Componente dialog modal
├── app/
│   ├── dashboard/(routes)/classification/
│   │   └── page.tsx             # Página principal integrada
│   └── api/classification/
│       └── route.ts             # API endpoints REST
└── lib/
    └── sample-data.ts           # Datos de ejemplo para desarrollo
```

## 🏗️ Capas de la Arquitectura

### 1. **Capa de Tipos (Types Layer)**

- `types/database.ts`: Define las interfaces TypeScript para las entidades de la base de datos
- Proporciona tipado fuerte y consistencia en toda la aplicación

### 2. **Capa de Servicios (Service Layer)**

- `services/classification.service.ts`: Maneja todas las consultas a Supabase
- Métodos especializados para diferentes tipos de consultas
- Manejo centralizado de errores
- Reutilizable en diferentes partes de la aplicación

### 3. **Capa de Hooks (Custom Hooks Layer)**

- `hooks/use-classification.ts`: Hook personalizado para el manejo de estado
- Encapsula la lógica de fetching, filtering y error handling
- Proporciona una API limpia para los componentes

### 4. **Capa de Componentes (Components Layer)**

- Componentes modulares y reutilizables
- Cada componente tiene una responsabilidad específica
- Uso de composition pattern para flexibilidad

### 5. **Capa de API (API Layer)**

- `app/api/classification/route.ts`: Endpoint REST para operaciones de clasificación
- Alternativa a las consultas directas desde el cliente

## � Nuevas Funcionalidades Implementadas

### **✨ Gestión Completa de Snippets**

#### **Creación de Snippets**

- **Formulario completo** con validación en tiempo real
- **Editor con tabs** (Editor/Vista Previa)
- **Soporte para Markdown** con generación automática
- **Tags dinámicos** con agregar/quitar
- **Clasificación inteligente** (categoría, lenguaje, framework)
- **Frameworks filtrados** por lenguaje seleccionado

#### **Características del Editor**

- **Vista previa en vivo** del formato Markdown
- **Validación de campos requeridos**
- **Autocompletado de frameworks** basado en lenguaje
- **Gestión de tags** con teclado (Enter para agregar)
- **Estados de loading** durante el guardado

#### **Exportación y Formato**

- **Generación automática de Markdown** con formato estandarizado
- **Exportación como archivos .md**
- **Metadatos completos** (lenguaje, categoría, framework, proyecto, tags)
- **Timestamps** de creación y actualización

### **🔧 Servicios y Arquitectura**

#### **SnippetService**

```typescript
// Crear nuevo snippet
await snippetService.createSnippet(userId, formData);

// Actualizar snippet existente
await snippetService.updateSnippet(snippetId, userId, formData);

// Eliminar snippet
await snippetService.deleteSnippet(snippetId, userId);

// Obtener snippet completo
await snippetService.getSnippet(snippetId, userId);

// Exportar como Markdown
snippetService.exportAsMarkdown(snippet);
```

#### **useSnippetOperations Hook**

```typescript
const {
  loading, // Estado de carga
  error, // Errores de operación
  createSnippet, // Crear nuevo snippet
  updateSnippet, // Actualizar existente
  deleteSnippet, // Eliminar snippet
  getSnippet, // Obtener snippet por ID
  exportSnippet, // Exportar como Markdown
  clearError, // Limpiar errores
} = useSnippetOperations();
```

## 🛠️ Servicios Disponibles

### ClassificationService

```typescript
// Obtener todos los datos de clasificación
const data = await classificationService.getClassificationData(userId);

// Filtrar por categoría
const snippets = await classificationService.getSnippetsByCategory(
  userId,
  categoryId
);

// Filtrar por lenguaje
const snippets = await classificationService.getSnippetsByLanguage(
  userId,
  languageId
);

// Obtener estadísticas
const stats = await classificationService.getClassificationStatistics(userId);
```

## 🎣 Hook de Clasificación

```typescript
const {
  data, // Datos completos de clasificación
  loading, // Estado de carga
  error, // Errores
  refetch, // Refrescar datos
  filterByCategory,
  filterByLanguage,
  clearFilters,
} = useClassification(userId);
```

## 🧩 Componentes

### SnippetCard

Muestra un snippet individual con sus badges de categoría, lenguaje y framework.

### ClassificationFilters

Filtros dropdown para categorías y lenguajes con indicadores visuales.

### ClassificationStats

Dashboard de estadísticas con métricas por categoría, lenguaje y framework.

### SnippetGrid

Grid responsive que maneja el layout de múltiples snippets con estados de loading y empty.

### JsonViewer

Componente de debugging para visualizar los datos JSON completos.

## 📊 Estructura de Datos

```typescript
interface ClassificationData {
  snippets: SnippetWithRelations[]; // Snippets con relaciones
  categories: Category[]; // Todas las categorías
  languages: Language[]; // Todos los lenguajes
  frameworks: Framework[]; // Todos los frameworks
  statistics: {
    // Estadísticas calculadas
    totalSnippets: number;
    snippetsByCategory: { [key: string]: number };
    snippetsByLanguage: { [key: string]: number };
    snippetsByFramework: { [key: string]: number };
  };
}
```

## 🚀 Características

### ✅ Modular

- Cada componente tiene una responsabilidad específica
- Fácil de mantener y extender

### ✅ Escalable

- Servicios reutilizables
- Patrón de hooks para lógica compleja
- Tipado fuerte con TypeScript

### ✅ Reutilizable

- Componentes composables
- Hooks personalizados
- Servicios independientes

### ✅ Limpia

- Separación clara de responsabilidades
- Código autodocumentado
- Manejo consistente de errores

## 🔧 Uso

1. **Instalar dependencias** (ya están en package.json)
2. **Configurar variables de entorno** para Supabase
3. **Importar y usar** en cualquier página o componente:

```typescript
import { useClassification } from "@/hooks/use-classification";
import {
  ClassificationFilters,
  SnippetGrid,
} from "@/components/classification";

export default function MyPage() {
  const { data, loading } = useClassification(userId);

  return (
    <div>
      {data && (
        <>
          <ClassificationFilters {...data} />
          <SnippetGrid snippets={data.snippets} />
        </>
      )}
    </div>
  );
}
```

## 🎯 Próximas Mejoras

- [ ] Paginación para grandes conjuntos de datos
- [ ] Búsqueda por texto
- [ ] Filtros múltiples simultáneos
- [ ] Cache de datos con React Query
- [ ] Ordenamiento personalizado
- [ ] Exportar datos a diferentes formatos
