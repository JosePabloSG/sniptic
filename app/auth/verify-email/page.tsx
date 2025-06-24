import { Suspense } from "react"
import { Mail } from "lucide-react"
import { VerifyEmailContent } from "./verify-email-content"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verifica tu correo electrónico
          </h1>
          <p className="text-gray-600 mb-6">
            Cargando información...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  )
}
