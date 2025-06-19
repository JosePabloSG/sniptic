export function ProjectDetailLoading() {
  return (
    <div className="space-y-6">
      {/* Project Stats Loading */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>

      {/* Filters Loading */}
      <div className="h-16 bg-muted animate-pulse rounded-lg" />

      {/* Snippets Grid Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  )
}
