"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface NavLinksProps {
  isMobile?: boolean
  setIsOpen?: (open: boolean) => void
}

export function NavLinks({ isMobile, setIsOpen }: NavLinksProps) {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState<string>("#hero")

  const links = [
    { href: "#hero", label: "Inicio" },
    { href: "#features", label: "Características" },
    { href: "#about", label: "Acerca de" },
    { href: "#pricing", label: "Precios" },
    { href: "#contact", label: "Contacto" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections
      const sections = links.map(link => document.querySelector(link.href)).filter(Boolean);

      if (sections.length) {
        // Determine which section is currently visible
        let current = "#hero";

        for (const section of sections) {
          const rect = section!.getBoundingClientRect();
          // Check if the section is in view (allowing a bit of overlap)
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = `#${section!.id}`;
            break;
          }
        }

        setActiveSection(current);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // Close mobile menu if needed
    if (isMobile && setIsOpen) {
      setIsOpen(false);
    }

    // Get the target element
    const target = document.querySelector(href);
    if (target) {
      // Smooth scroll to the target
      target.scrollIntoView({ behavior: 'smooth' });

      // Update URL without reload
      window.history.pushState(null, '', href);
    }
  }

  return (
    <ul className={cn("flex gap-1", isMobile ? "flex-col space-y-3 px-2" : "items-center")}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              isMobile ? "flex py-2 px-2 rounded-md" : "px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground",
              activeSection === link.href ? "text-foreground" : "text-foreground/60",
            )}
            onClick={(e) => scrollToSection(e, link.href)}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
