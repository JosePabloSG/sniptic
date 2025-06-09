"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, DollarSign } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Gratis",
      price: "$0",
      frequency: "/mes",
      description: "Perfecto para empezar y explorar las funcionalidades básicas de Sniptic.",
      features: ["Hasta 50 snippets", "Organización básica", "Acceso a prompts de IA limitados", "Soporte comunitario"],
      cta: "Comenzar Gratis",
      isFeatured: true,
    },
    {
      name: "Pro",
      price: "Próximamente",
      frequency: "",
      description: "Desbloquea todo el potencial de Sniptic con características avanzadas.",
      features: [
        "Snippets ilimitados",
        "Organización avanzada con IA",
        "Prompt Builder contextual completo",
        "Refactorización automática",
        "Sincronización entre dispositivos",
        "Soporte prioritario",
      ],
      cta: "Notifícame",
      isFeatured: false,
      comingSoon: true,
    },
  ]

  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden ">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-0.5 h-32 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="absolute bottom-1/3 right-20 w-0.5 h-24 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-primary/10 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-20 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-primary/5 text-sm text-primary mb-6">
          <DollarSign className="h-4 w-4" />
          Planes y Precios
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="block text-foreground">Elige el plan</span>
          <span className="block text-primary">perfecto para ti</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Comienza gratis y explora nuestras funcionalidades. Pronto lanzaremos planes con más poder para llevar tu
          productividad al siguiente nivel.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 shadow-sm transition-all hover:shadow-lg ${
                plan.isFeatured ? "bg-primary/5 border-primary/30 ring-2 ring-primary" : "bg-white border-gray-200"
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    Más Popular
                  </div>
                </div>
              )}

              <div className="flex-grow">
                <h3 className={`text-2xl font-semibold ${plan.isFeatured ? "text-primary" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={`text-4xl font-bold tracking-tight ${plan.comingSoon ? "text-gray-400" : plan.isFeatured ? "text-primary" : "text-foreground"}`}
                  >
                    {plan.price}
                  </span>
                  {plan.frequency && !plan.comingSoon && (
                    <span className="text-sm font-medium text-muted-foreground">{plan.frequency}</span>
                  )}
                </div>
                <p className="mt-6 text-muted-foreground text-sm leading-relaxed">{plan.description}</p>

                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 items-center">
                      <CheckCircle2
                        className={`h-5 w-5 flex-none ${plan.isFeatured ? "text-primary" : "text-green-500"}`}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                asChild
                size="lg"
                className={`mt-10 w-full rounded-full ${
                  plan.comingSoon
                    ? "bg-gray-200 text-gray-500 hover:bg-gray-300 cursor-not-allowed"
                    : plan.isFeatured
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
                disabled={plan.comingSoon}
              >
                <a href={plan.comingSoon ? "#" : plan.name === "Gratis" ? "/signup" : "#notify"}>{plan.cta}</a>
              </Button>
              {plan.comingSoon && (
                <p className="mt-2 text-xs text-center text-muted-foreground">¡Disponible muy pronto!</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
