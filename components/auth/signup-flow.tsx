"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { SocialSignupView } from "./social-signup-view"
import { EmailSignupView } from "./email-signup-view"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function SignupFlow() {
  const [view, setView] = useState<"social" | "email">("social")

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      <div className="absolute -top-8 -left-8 w-20 h-20 bg-[#10B981]/10 rounded-full animate-pulse delay-100"></div>
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-[#10B981]/10 rounded-full animate-pulse delay-300"></div>

      <motion.div 
        className="relative bg-card border border-gray-200/20 rounded-2xl shadow-2xl p-8 backdrop-blur-lg overflow-hidden"
        layout
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <div className="grid grid-cols-3 items-center mb-8">
          {view === "email" ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView("social")}
              className="text-gray-600 hover:bg-gray-100 justify-self-start"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          ) : (
            <div></div>
          )}
          <div className="flex items-center justify-center">
            <Image src="/assets/sniptic.svg" alt="Sniptic Logo" width={32} height={32} />
          </div>
          <div></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ 
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {view === "social" ? (
              <SocialSignupView onShowEmailSignup={() => setView("email")} />
            ) : (
              <EmailSignupView onShowSocialSignup={() => setView("social")} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
