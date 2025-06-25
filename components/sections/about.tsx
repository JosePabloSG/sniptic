export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-blue-300/30 to-transparent"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-green-300/30 to-transparent"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 border border-purple-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-20 left-1/3 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse delay-1200"></div>
      </div>

      {/* Minimal Header */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-block px-4 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm text-sm text-muted-foreground mb-8">
            Conoce Sniptic
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            <span className="block text-foreground">Más que una</span>
            <span className="block text-foreground relative">
              herramienta
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-full"></div>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">Una nueva forma de programar con inteligencia</p>
        </div>

        {/* Story Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Colorful Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200/50 via-purple-300/50 to-orange-200/50"></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {/* What is Sniptic */}
              <div className="relative flex items-start gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200 rounded-full flex items-center justify-center relative z-10">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">¿Qué es Sniptic?</h3>
                        <p className="text-muted-foreground">Una herramienta moderna para programadores</p>
                      </div>
                      <div className="text-4xl opacity-20">💡</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Sniptic es una herramienta moderna que permite guardar, organizar y reutilizar snippets de código
                      y prompts de inteligencia artificial. Diseñada para mantener tu flujo de trabajo limpio y
                      eficiente.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-100/50 rounded-xl border border-blue-200/50">
                        <div className="text-2xl font-bold text-blue-600">150+</div>
                        <div className="text-sm text-blue-700/70">Snippets</div>
                      </div>
                      <div className="text-center p-4 bg-green-100/50 rounded-xl border border-green-200/50">
                        <div className="text-2xl font-bold text-green-600">50+</div>
                        <div className="text-sm text-green-700/70">Prompts IA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why we created it */}
              <div className="relative flex items-start gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-200 rounded-full flex items-center justify-center relative z-10">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">¿Por qué lo creamos?</h3>
                        <p className="text-muted-foreground">Nacimos de la frustración</p>
                      </div>
                      <div className="text-4xl opacity-20">🎯</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Como desarrolladores, nos frustraba tener snippets regados en archivos, gists o Notion. También
                      queríamos experimentar con prompts de IA sin un lugar estructurado para organizarlos.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/20">
                        <div className="w-2 h-2 bg-muted-foreground/40 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Snippets regados en archivos</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/20">
                        <div className="w-2 h-2 bg-muted-foreground/40 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Gists perdidos en GitHub</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/20">
                        <div className="w-2 h-2 bg-muted-foreground/40 rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Prompts sin organizar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Who is it for */}
              <div className="relative flex items-start gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200 rounded-full flex items-center justify-center relative z-10">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">¿Para quién es?</h3>
                        <p className="text-muted-foreground">Para desarrolladores como tú</p>
                      </div>
                      <div className="text-4xl opacity-20">👥</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Pensado para desarrolladores web y mobile, desde estudiantes hasta profesionales senior. Si usas
                      VSCode, Copilot o Cursor y valoras la productividad, esta plataforma es para ti.
                    </p>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/30">
                        <div className="text-2xl mb-1">🎓</div>
                        <div className="text-xs font-medium text-foreground">Estudiantes</div>
                      </div>
                      <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/30">
                        <div className="text-2xl mb-1">👨‍💻</div>
                        <div className="text-xs font-medium text-foreground">Juniors</div>
                      </div>
                      <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/30">
                        <div className="text-2xl mb-1">🚀</div>
                        <div className="text-xs font-medium text-foreground">Seniors</div>
                      </div>
                      <div className="text-center p-3 bg-muted/20 rounded-lg border border-border/30">
                        <div className="text-2xl mb-1">🏢</div>
                        <div className="text-xs font-medium text-foreground">Equipos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our vision */}
              <div className="relative flex items-start gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-full flex items-center justify-center relative z-10">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">Nuestra visión</h3>
                        <p className="text-muted-foreground">Código más inteligente</p>
                      </div>
                      <div className="text-4xl opacity-20">🎯</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Creemos que el código debería ser más reutilizable, accesible e inteligente. Nuestra misión es
                      ayudarte a escribir menos, pensar mejor y lograr más.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="font-medium text-sm text-foreground">Escribir menos</div>
                        <div className="text-xs text-muted-foreground mt-1">Reutiliza más</div>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="font-medium text-sm text-foreground">Pensar mejor</div>
                        <div className="text-xs text-muted-foreground mt-1">Enfócate</div>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="font-medium text-sm text-foreground">Lograr más</div>
                        <div className="text-xs text-muted-foreground mt-1">Herramientas simples</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Plans */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full border border-border/50 bg-background/80 backdrop-blur-sm text-sm text-muted-foreground mb-6">
              ¿Qué viene después?
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">Estamos apenas comenzando</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Actualmente estamos en versión temprana (MVP). Muy pronto vendrán mejoras como sincronización,
              colaboración y galería comunitaria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-6 bg-background/30 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-blue-300/50 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100/60 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200/80 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Sincronización</h4>
              <p className="text-sm text-muted-foreground">Entre todos tus dispositivos</p>
            </div>

            <div className="group p-6 bg-background/30 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-green-300/50 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100/60 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200/80 transition-colors">
                <svg
                  className="w-6 h-6 text-green-600 group-hover:text-green-700 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Colaboración</h4>
              <p className="text-sm text-muted-foreground">Comparte con tu equipo</p>
            </div>

            <div className="group p-6 bg-background/30 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-purple-300/50 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100/60 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200/80 transition-colors">
                <svg
                  className="w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Galería</h4>
              <p className="text-sm text-muted-foreground">Prompts de la comunidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
