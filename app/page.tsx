import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Cta from "@/components/sections/CTA";
import Features from "@/components/sections/features";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Features />
        <About />
        <Contact />
        <Cta />
      </div>
    </div>
  )
}
