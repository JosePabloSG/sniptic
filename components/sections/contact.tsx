import { Send } from "lucide-react";
import { Button } from "../ui/button";


export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-primary/20 rounded-full animate-pulse delay-400"></div>
        <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-primary/15 rounded-full animate-pulse delay-800"></div>
        <div className="absolute top-1/2 left-10 w-6 h-0.5 bg-gradient-to-r from-primary/10 to-transparent"></div>
        <div className="absolute bottom-1/4 right-20 w-0.5 h-12 bg-gradient-to-t from-primary/10 to-transparent"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-primary/5 text-sm text-primary mb-6">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          Hablemos
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="block text-foreground">¿Tienes alguna</span>
          <span className="block text-primary">pregunta?</span>
        </h2>
        <div className="flex items-center justify-center gap-4 text-lg text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-primary/60"></div>
            <div className="w-1 h-0.5 bg-primary/30"></div>
          </div>
          <span>Estamos aquí para ayudarte</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-stretch">
        {/* Contact Form */}
        <div className="lg:col-span-7 space-y-8 flex">
          <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col">
            <div className="space-y-6 flex-1 flex flex-col">
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Envíanos un mensaje</h3>
                  <p className="text-muted-foreground">
                    Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                  </p>
                </div>
              </div>

              <form className="space-y-6 flex-1 flex flex-col">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Empresa (opcional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all"
                    placeholder="Tu empresa"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white outline-none transition-all resize-none"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  ></textarea>
                </div>

                <Button type="submit" className="w-full h-10 mt-4 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                  Enviar mensaje
                  <Send className="ml-2 h-4 w-4 inline-block" />
                </Button>
              </form>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/20 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary/10 rounded-full"></div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Contact Details */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-foreground">Información de contacto</h3>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Correo electrónico</div>
                    <a
                      href="mailto:suarezgomezjosepablo03@gmail.com"
                      className="text-sm text-primary hover:text-primary/80 transition-colors break-all"
                    >
                      suarezgomezjosepablo03@gmail.com
                    </a>
                    <div className="text-xs text-muted-foreground mt-1">Respuesta en menos de 24 horas</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-green-50/50 rounded-xl border border-green-100">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Teléfono</div>
                    <a
                      href="tel:+50664251906"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      +506 64251906
                    </a>
                    <div className="text-xs text-muted-foreground mt-1">
                      Lunes a viernes, 9:00 AM - 6:00 PM (GMT-6)
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Ubicación</div>
                    <div className="text-sm text-muted-foreground">Costa Rica</div>
                    <div className="text-xs text-muted-foreground mt-1">Trabajamos de forma remota</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Response */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6 shadow-sm flex-1">
            <div className="text-center space-y-4 h-full flex flex-col justify-center">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto">
                <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Respuesta rápida</h4>
                <p className="text-sm text-muted-foreground">
                  Nos comprometemos a responder todos los mensajes en menos de 24 horas.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-amber-700 bg-amber-100 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span>Generalmente respondemos en 2-4 horas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
