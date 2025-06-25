"use client";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const useTypewriter = (words: string[], speed = 100, deleteSpeed = 50, delayBetweenWords = 2000) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    }, isPaused ? delayBetweenWords : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, speed, deleteSpeed, delayBetweenWords]);

  return currentText;
};

export default function Hero() {
  const typewriterWords = [
    "potenciados por IA",
    "para Cursor AI",
    "con GitHub Copilot",
    "optimizados automáticamente",
    "inteligentes y adaptativos"
  ];

  const animatedText = useTypewriter(typewriterWords, 80, 40, 2500);

  return (
    <section id="hero" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-8 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="absolute bottom-1/4 right-10 w-8 h-1 bg-gradient-to-r from-primary/10 to-transparent"></div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-300 bg-green-100 text-sm text-primary">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Nuevo: Rules para Cursor
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-foreground">Snippets, Prompts</span>
                <span className="block text-primary">& Rules</span>
                <span className="block text-foreground/80 text-4xl sm:text-5xl lg:text-6xl font-light">
                  {animatedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>

              <div className="flex items-center gap-4 text-lg text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-primary"></div>
                  <div className="w-2 h-0.5 bg-primary/60"></div>
                  <div className="w-1 h-0.5 bg-primary/30"></div>
                </div>
                <span>para programadores modernos con Cursor</span>
              </div>
            </div>

            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Guarda, organiza y mejora tus snippets de código, prompts de IA y rules para Cursor.
              Con refactorización automática, asistentes inteligentes y reglas personalizadas que
              elevan la calidad de tu código.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size={'lg'} className="rounded-2xl">Comenzar gratis</Button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md">
            {/* Main Card */}
            <div className="relative bg-card border rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">.cursorrules</div>
                </div>

                <div className="space-y-2 font-mono text-sm">
                  <div className="text-blue-600">{`# Rules para TypeScript`}</div>
                  <div className="text-gray-600">- Usa const assertions</div>
                  <div className="text-gray-600">- Prefiere type sobre interface</div>
                  <div className="text-gray-600">- Valida props con Zod</div>
                  <div className="text-gray-600">- Componentes funcionales</div>
                  <div className="text-gray-600">- Tailwind para estilos</div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Cursor Rules</div>
                  <div className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">TypeScript</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/10 rounded-lg rotate-12 animate-bounce delay-300"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500/20 rounded rotate-45 animate-pulse"></div>
            </div>

            {/* Secondary Cards */}
            <div className="absolute -top-4 -left-4 w-16 h-20 bg-card/80 border rounded-lg backdrop-blur-sm rotate-12 shadow-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-16 bg-card/60 border rounded-lg backdrop-blur-sm -rotate-6 shadow-sm"></div>
          </div>
        </div>
      </div>
    </section>
  )
}