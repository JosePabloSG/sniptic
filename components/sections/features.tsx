export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-1/4 w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-primary/15 rounded-full animate-pulse delay-1200"></div>
        <div className="absolute top-1/2 left-10 w-6 h-0.5 bg-gradient-to-r from-primary/10 to-transparent"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-primary/5 text-sm text-primary mb-6">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          Características principales
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="block text-foreground">Herramientas que</span>
          <span className="block text-primary">potencian tu código</span>
        </h2>
        <div className="flex items-center justify-center gap-4 text-lg text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-primary/60"></div>
            <div className="w-1 h-0.5 bg-primary/30"></div>
          </div>
          <span>Todo lo que necesitas en un solo lugar</span>
        </div>
      </div>

      {/* Feature 1: Prompt Builder */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            IA Avanzada
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="block text-foreground">Prompt Builder</span>
            <span className="block text-blue-600">contextual</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Crea prompts inteligentes que entienden el contexto de tu código. Nuestro builder analiza tu proyecto y
            sugiere prompts optimizados para obtener los mejores resultados de la IA.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Análisis contextual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Sugerencias inteligentes</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Prompt Builder</span>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="text-gray-600">Contexto detectado: React Component</div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-blue-600">{"Optimiza este componente React para:"}</div>
                    <div className="text-gray-700 ml-2">• Mejor rendimiento</div>
                    <div className="text-gray-700 ml-2">• Accesibilidad mejorada</div>
                    <div className="text-gray-700 ml-2">• TypeScript strict mode</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-200 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-indigo-200 rounded rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Feature 2: Auto Refactoring */}
      <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-7 relative order-2 lg:order-1">
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Antes</span>
                  <span className="text-sm text-gray-500">Después</span>
                </div>
                <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="text-red-600">{"function getData() {"}</div>
                    <div className="text-red-600 ml-2">{"var result = [];"}</div>
                    <div className="text-red-600 ml-2">{"for(var i=0; i<data.length; i++){"}</div>
                    <div className="text-red-600 ml-4">{"result.push(data[i]);"}</div>
                    <div className="text-red-600 ml-2">{"}"}</div>
                    <div className="text-red-600">{"}"}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-green-600">{"const getData = () => {"}</div>
                    <div className="text-green-600 ml-2">{"return data.map(item => item);"}</div>
                    <div className="text-green-600">{"}"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Refactorizado automáticamente</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-green-200 rounded-lg -rotate-12 animate-bounce delay-500"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-emerald-200 rounded -rotate-45"></div>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Automático
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="block text-foreground">Refactorización</span>
            <span className="block text-green-600">inteligente</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            La IA analiza tu código y lo mejora automáticamente. Optimiza el rendimiento, actualiza sintaxis
            obsoleta y aplica las mejores prácticas sin que tengas que hacer nada.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>ES6+ automático</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Optimización de rendimiento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3: Classification System */}
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Organización IA
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="block text-foreground">Clasificación</span>
            <span className="block text-purple-600">inteligente</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Organiza automáticamente tus snippets por proyectos, tecnologías y contexto. El sistema detecta el
            lenguaje, framework y propósito de cada snippet para crear una biblioteca perfectamente estructurada.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <span className="text-foreground font-medium">Por Proyectos</span>
              <span className="text-muted-foreground">- Organiza por contexto de proyecto</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>
              <span className="text-foreground font-medium">Por Tecnología</span>
              <span className="text-muted-foreground">- Detecta lenguajes y frameworks</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-foreground font-medium">Auto-etiquetado</span>
              <span className="text-muted-foreground">- Clasifica automáticamente con IA</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-600">Biblioteca de Snippets</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Auto-clasificado</span>
                  </div>
                </div>

                {/* Project Folders */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">E-commerce App</div>
                      <div className="text-xs text-gray-500">React • TypeScript • 24 snippets</div>
                    </div>
                    <div className="text-xs text-blue-600 font-medium">React</div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">API Utils</div>
                      <div className="text-xs text-gray-500">Node.js • Express • 18 snippets</div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">Node.js</div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-orange-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">UI Components</div>
                      <div className="text-xs text-gray-500">CSS • Tailwind • 31 snippets</div>
                    </div>
                    <div className="text-xs text-orange-600 font-medium">CSS</div>
                  </div>
                </div>

                {/* Technology Tags */}
                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-500 mb-2">Tecnologías detectadas:</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">React</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Node.js</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">JavaScript</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">TypeScript</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">CSS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-purple-200 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-200 rounded rotate-45 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  )
}