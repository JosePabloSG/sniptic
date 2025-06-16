"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, KeyRound, AtSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { login } from "@/app/login/actions"
import { createClient } from "@/utils/supabase/client"

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true)
      const supabase = createClient()
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/confirm`,
        },
      })
    } catch (error) {
      console.error(`Error al iniciar sesión con ${provider}:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    console.log("Datos del formulario (UI only):", data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    alert("Login attempt (UI only)!")
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      {/* Decorative elements using the green accent color */}
      <div className="absolute -top-8 -left-8 w-20 h-20 bg-[#10B981]/10 rounded-full animate-pulse delay-100"></div>
      <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-[#10B981]/10 rounded-full animate-pulse delay-300"></div>

      <div className="relative bg-card border border-gray-200/20 rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
        <div className="text-center mb-8">
          <div className="mb-4">
            <Image src="/sniptic.svg" alt="Sniptic Logo" width={60} height={60} className="mx-auto" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Accede a tu Workspace</h1>
          <p className="text-gray-500 mt-2">Desbloquea tu potencial de código con Sniptic.</p>
        </div>

        <Form {...form}>
          <form action={login} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Correo Electrónico</FormLabel>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        {...field}
                        className="pl-12 py-6 text-base rounded-2xl border-gray-300 focus:border-[#10B981] focus:ring-[#10B981]"
                        aria-label="Correo Electrónico"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Contraseña</FormLabel>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                        className="pr-12 pl-12 py-6 text-base rounded-2xl border-gray-300 focus:border-[#10B981] focus:ring-[#10B981]"
                        aria-label="Contraseña"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 text-gray-400 hover:bg-gray-100 rounded-2xl"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between text-sm">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="rememberMe"
                        className="data-[state=checked]:bg-[#10B981] data-[state=checked]:border-[#10B981]"
                      />
                    </FormControl>
                    <Label htmlFor="rememberMe" className="font-normal text-gray-600 cursor-pointer">
                      Recordarme
                    </Label>
                  </FormItem>
                )}
              />

              <Link href="/forgot-password">
                <span className="font-medium text-gray-600 hover:text-gray-800 transition-colors">
                  ¿Olvidaste tu contraseña?
                </span>
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-base font-semibold group rounded-2xl bg-gray-900 text-white hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-gray-500">O continúa con</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full py-6 text-base group rounded-2xl border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            disabled={isLoading}
            onClick={() => onSocialLogin('google')}
          >
            <Image
              src="/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
            />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full py-6 text-base group rounded-2xl border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            disabled={isLoading}
            onClick={() => onSocialLogin('github')}
          >
            <Image
              src="/github.svg"
              alt="GitHub Logo"
              width={20}
              height={20}
              className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
            />
            GitHub
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-[#10B981] hover:underline font-medium">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}
