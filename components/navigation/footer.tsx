export default function Footer() {
  return (
    < footer className="relative bg-gray-50 border-t" >
      {/* Background Elements */}
      < div className="absolute inset-0 -z-10" >
        <div className="absolute top-10 left-1/4 w-1 h-1 bg-primary/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-1/3 w-1.5 h-1.5 bg-primary/5 rounded-full animate-pulse delay-1000"></div>
      </div >

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold tracking-tight text-foreground">Sniptic</span>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  La herramienta moderna para programadores que permite guardar, organizar y reutilizar snippets de
                  código y prompts de IA.
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-8 grid md:grid-cols-4 gap-8">
              {/* Product */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Producto</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Características
                    </a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Recursos</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Documentación
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Empresa</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Acerca de
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Soporte</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Centro de ayuda
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Reportar bug
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="border-t py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Sniptic. Todos los derechos reservados.</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Términos de servicio
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer >
  )
}