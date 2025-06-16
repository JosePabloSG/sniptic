"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle } from "lucide-react"

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-500/5 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/5 rounded-full animate-pulse delay-500"></div>
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-[#10B981]/5 rounded-full animate-ping opacity-50"></div>

      <main className="relative z-10 w-full max-w-2xl">
        <div className="bg-card border border-gray-200/30 rounded-2xl shadow-2xl p-8 sm:p-12 backdrop-blur-md text-center">
          <div className="mb-8">
            <Image
              src="/fun-error-svg.png"
              alt="Creative Error Illustration"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Oops! Houston, we have a <span className="text-[#10B981]">glitch.</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            It seems we&apos;ve hit a snag. The page you&apos;re looking for might have been moved, deleted, or is temporarily
            unavailable.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/">
              <Button
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800 rounded-2xl px-8 py-3 text-base font-semibold group w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                Go Back Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-2xl px-8 py-3 text-base font-semibold w-full sm:w-auto"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Report a Problem
            </Button>
          </div>

          <div className="mt-12 text-sm text-gray-400">
            <p>Error Code: 404</p>
          </div>
        </div>
      </main>
    </div>
  )
}
