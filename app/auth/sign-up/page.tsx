import { SignupFlow } from "@/components/auth/signup-flow"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <main className="flex items-center justify-center w-full">
        <SignupFlow />
      </main>
    </div>
  )
}
