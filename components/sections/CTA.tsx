import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

export default function Cta() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-20 h-0.5 bg-gradient-to-r from-primary/20 to-transparent rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-0.5 bg-gradient-to-l from-primary/15 to-transparent -rotate-45"></div>
        <div className="absolute top-1/2 right-10 w-1 h-12 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
      </div>

      <div className="text-center space-y-12">
        {/* Code-like Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 font-mono text-sm text-gray-600">
            <span className="text-blue-600">const</span>
            <span className="text-purple-600">nextStep</span>
            <span className="text-gray-500">=</span>
            <span className="text-green-600">&quot;comenzar&quot;</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="block text-foreground">¿Listo para</span>
            <span className="block text-primary">comenzar?</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Únete a miles de desarrolladores que ya usan Sniptic para organizar su código y potenciar su
            productividad
          </p>
        </div>

        {/* Interactive CTA */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-background border-2 border-primary/20 rounded-2xl p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span>sniptic.app</span>
              </div>

              <div className="font-mono text-left space-y-2 text-sm">
                <div className="text-blue-600">{`// Conectando a sniptic.app...`}</div>
                <div className="text-gray-500">✓ Acceso a la plataforma</div>
                <div className="text-gray-500">✓ Configurando tu espacio de trabajo</div>
                <div className="text-green-600">→ ¡Tu dashboard está listo!</div>
              </div>
            </div>

            <Button size="lg" className="w-full">
              Comenzar gratis
              <ArrowRight className="mr-2" />
            </Button>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Configuración en 1 minuto</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Sin tarjeta de crédito</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                A
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                C
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                L
              </div>
              <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                +
              </div>
            </div>
            <span>Únete a los primeros desarrolladores</span>
          </div>
        </div>
      </div>
    </section>
  )
}