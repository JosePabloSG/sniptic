export function SnippetDetailLoading() {
  return (
    <div className="space-y-6">
      {/* Header Loading */}
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-8 bg-muted animate-pulse rounded-lg w-2/3" />
          <div className="h-6 bg-muted animate-pulse rounded-lg w-1/2" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 w-32 bg-muted animate-pulse rounded-lg" />
          <div className="h-10 w-10 bg-muted animate-pulse rounded-lg" />
          <div className="h-10 w-10 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Metadata Loading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>

      {/* Code Loading */}
      <div className="h-96 bg-muted animate-pulse rounded-lg" />
    </div>
  )
}
