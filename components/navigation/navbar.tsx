"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { NavLinks } from "./nav-links"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/sniptic.svg"
              alt="Sniptic Logo"
              width={32}
              height={32}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold tracking-tight">Sniptic</span>
          </Link>
          <nav className="hidden md:flex">
            <NavLinks />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">
                Iniciar sesión
              </Link>
            </Button>
            <Button size="sm" asChild className="rounded-full">
              <Link href="/signup">Registrarse</Link>
            </Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>Navegación</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 py-6 px-2">
                <NavLinks isMobile setIsOpen={setIsOpen} />
                <div className="flex flex-col gap-2 pt-4 px-2">
                  <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/login">Iniciar sesión</Link>
                  </Button>
                  <Button asChild onClick={() => setIsOpen(false)} className="rounded-full">
                    <Link href="/signup">Registrarse</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
