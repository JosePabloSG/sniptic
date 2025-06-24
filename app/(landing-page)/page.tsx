import { Suspense } from "react";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Cta from "@/components/sections/CTA";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";
import Pricing from "@/components/sections/princing";
import { AuthHandler } from "@/components/auth/auth-handler";


export default function Home() {
  return (
    <div className="min-h-screen  bg-[#F4F4F5]">
      <Suspense>
        <AuthHandler />
      </Suspense>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Features />
        <About />
        <Pricing />
        <Contact />
        <Cta />
      </div>
    </div>
  )
}
