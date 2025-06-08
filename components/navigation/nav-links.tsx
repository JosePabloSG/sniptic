"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface NavLinksProps {
  isMobile?: boolean
  setIsOpen?: (open: boolean) => void
}

export function NavLinks({ isMobile, setIsOpen }: NavLinksProps) {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <ul className={cn("flex gap-1", isMobile ? "flex-col space-y-3 px-2" : "items-center")}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              isMobile ? "flex py-2 px-2 rounded-md" : "px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground",
              pathname === link.href ? "text-foreground" : "text-foreground/60",
            )}
            onClick={isMobile && setIsOpen ? () => setIsOpen(false) : undefined}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}
