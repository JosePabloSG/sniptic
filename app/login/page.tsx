import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col items-center justify-center">
      <main className="flex items-center justify-center p-4 sm:p-6 lg:p-8 w-full">
        <LoginForm />
      </main>
    </div>
  )
}
