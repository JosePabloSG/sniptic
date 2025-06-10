import Link from "next/link"
import { FileX, Home, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <main className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-primary/5 rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Main Visual Element */}
        <div className="relative mb-8">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-red-500/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500/10 rounded-full animate-pulse delay-300"></div>

          <div className="relative bg-card border border-dashed border-border/50 rounded-3xl p-8 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <FileX className="w-24 h-24 text-primary/50" strokeWidth={0.5} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="text-5xl font-bold text-destructive/80">?</span>
                </div>
              </div>
              <div className="font-mono text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-md border border-border/30">
                <span className="text-destructive">Error 404:</span> snippet_not_found
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-destructive/10 text-sm text-destructive-foreground">
            <AlertTriangle className="w-4 h-4" />
            <span>Ruta no encontrada</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Snippet Perdido
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Parece que el snippet que buscas se ha desvanecido en el éter digital o quizás nunca existió. No te
            preocupes, hasta el mejor código tiene punteros nulos.
          </p>

          <Button asChild size="lg">
            <Link href="/">
              <Home className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              Volver a la base
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
