import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section id="hero" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-8 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="absolute bottom-1/4 right-10 w-8 h-1 bg-gradient-to-r from-primary/10 to-transparent"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-primary/5 text-sm text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Nuevo: Prompt Builder contextual con IA
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-foreground">Snippets</span>
                <span className="block text-primary">& Prompts</span>
                <span className="block text-foreground/80 text-4xl sm:text-5xl lg:text-6xl font-light">
                  potenciados por IA
                </span>
              </h1>

              <div className="flex items-center gap-4 text-lg text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-primary"></div>
                  <div className="w-2 h-0.5 bg-primary/60"></div>
                  <div className="w-1 h-0.5 bg-primary/30"></div>
                </div>
                <span>para programadores modernos</span>
              </div>
            </div>

            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Guarda, organiza y mejora tus snippets de código y prompts de IA. Con refactorización automática y
              asistentes inteligentes que te ayudan a escribir, entender y reutilizar código.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size={'lg'}>Comenzar gratis</Button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md">
            {/* Main Card */}
            <div className="relative bg-card border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">snippet.ts</div>
                </div>

                <div className="space-y-2 font-mono text-sm">
                  <div className="text-blue-600">// Prompt para refactorizar</div>
                  <div className="text-purple-600">{"const prompt = `"}</div>
                  <div className="text-gray-600 ml-4">Refactoriza este código para</div>
                  <div className="text-gray-600 ml-4">mejorar su rendimiento y</div>
                  <div className="text-gray-600 ml-4">legibilidad usando ES6+</div>
                  <div className="text-purple-600">{"`"}</div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">AI Prompt</div>
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Refactor</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/10 rounded-lg rotate-12 animate-bounce delay-300"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500/20 rounded rotate-45 animate-pulse"></div>
            </div>

            {/* Secondary Cards */}
            <div className="absolute -top-4 -left-4 w-16 h-20 bg-card/80 border rounded-lg backdrop-blur-sm rotate-12 shadow-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-16 bg-card/60 border rounded-lg backdrop-blur-sm -rotate-6 shadow-sm"></div>
          </div>
        </div>
      </div>
    </section>
  )
}