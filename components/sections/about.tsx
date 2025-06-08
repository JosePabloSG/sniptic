export default function About() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-1/4 w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-primary/15 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-6 h-0.5 bg-gradient-to-l from-primary/10 to-transparent"></div>
        <div className="absolute bottom-20 left-20 w-0.5 h-12 bg-gradient-to-t from-primary/10 to-transparent"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-primary/5 text-sm text-primary mb-6">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          Conoce Sniptic
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="block text-foreground">Más que una</span>
          <span className="block text-primary">herramienta</span>
        </h2>
        <div className="flex items-center justify-center gap-4 text-lg text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-primary/60"></div>
            <div className="w-1 h-0.5 bg-primary/30"></div>
          </div>
          <span>Una nueva forma de programar</span>
        </div>
      </div>

      {/* What is Sniptic */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            ¿Qué es Sniptic?
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Una herramienta moderna para programadores
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sniptic es una herramienta moderna para programadores que permite guardar, organizar y reutilizar
            snippets de código y prompts de inteligencia artificial. Fue diseñada para ayudarte a mantener tu flujo
            de trabajo limpio, eficiente y enfocado.
          </p>
        </div>
        <div className="lg:col-span-6 relative">
          <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Snippets + IA</div>
                    <div className="text-xs text-gray-500">Todo en un lugar</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">150+</div>
                    <div className="text-xs text-gray-600">Snippets guardados</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">50+</div>
                    <div className="text-xs text-gray-600">Prompts de IA</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-200 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-200 rounded rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Why we created it */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-6 relative order-2 lg:order-1">
          <div className="relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">😤</div>
                  <div className="font-medium text-sm text-gray-700">El problema que resolvemos</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Snippets regados en archivos</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Gists perdidos en GitHub</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Prompts sin organizar</span>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <div className="text-2xl">→</div>
                  <div className="text-sm font-medium text-green-600">Sniptic lo resuelve</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-orange-200 rounded-lg -rotate-12 animate-bounce delay-500"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-200 rounded -rotate-45"></div>
          </div>
        </div>
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            ¿Por qué lo creamos?
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Nacimos de la frustración
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Como desarrolladores, nos frustraba tener nuestros snippets regados en archivos, gists o Notion. También
            queríamos experimentar con prompts de IA, pero sin un lugar estructurado para organizarlos. Sniptic nace
            para resolver eso.
          </p>
        </div>
      </div>

      {/* Who is it for */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            ¿Para quién es?
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Para desarrolladores como tú
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sniptic está pensado para desarrolladores web y mobile, desde estudiantes hasta profesionales senior. Si
            usas herramientas como VSCode, Copilot o Cursor y valoras la productividad, esta plataforma es para ti.
          </p>
        </div>
        <div className="lg:col-span-6 relative">
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="font-medium text-sm text-gray-700">Nuestros usuarios</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-1">🎓</div>
                    <div className="text-xs font-medium">Estudiantes</div>
                    <div className="text-xs text-gray-500">Aprendiendo</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-1">👨‍💻</div>
                    <div className="text-xs font-medium">Juniors</div>
                    <div className="text-xs text-gray-500">Creciendo</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-1">🚀</div>
                    <div className="text-xs font-medium">Seniors</div>
                    <div className="text-xs text-gray-500">Liderando</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl mb-1">🏢</div>
                    <div className="text-xs font-medium">Equipos</div>
                    <div className="text-xs text-gray-500">Colaborando</div>
                  </div>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">VSCode</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Copilot</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">Cursor</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-green-200 rounded-lg rotate-12"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-emerald-200 rounded rotate-45 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>

      {/* Our vision */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-6 relative order-2 lg:order-1">
          <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="font-medium text-sm text-gray-700">Nuestra misión</div>
                </div>
                <div className="space-y-3">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-sm text-purple-700">Escribir menos</div>
                    <div className="text-xs text-gray-500">Reutiliza más código</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-sm text-blue-700">Pensar mejor</div>
                    <div className="text-xs text-gray-500">Enfócate en lo importante</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-sm text-green-700">Lograr más</div>
                    <div className="text-xs text-gray-500">Con herramientas simples</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-purple-200 rounded-lg -rotate-12 animate-pulse delay-700"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-pink-200 rounded -rotate-45"></div>
          </div>
        </div>
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Nuestra visión
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Código más inteligente</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Creemos que el código debería ser más reutilizable, más accesible y más inteligente. Nuestra misión es
            ayudarte a escribir menos, pensar mejor y lograr más con herramientas simples y efectivas.
          </p>
        </div>
      </div>

      {/* What's next */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          ¿Qué viene después?
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6">
          Estamos apenas comenzando
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
          Actualmente estamos en versión temprana (MVP). Muy pronto vendrán mejoras como sincronización entre
          dispositivos, soporte colaborativo y una galería de prompts comunitarios.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </section>
  )
}