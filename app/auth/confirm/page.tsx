import { Suspense } from "react";
import { AuthConfirmContent } from "./auth-confirm-content";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 border-4 border-t-[#10B981] border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold mb-2 text-gray-900">
            Verificando tu email...
          </h1>
          <p className="text-gray-600">
            Por favor espera mientras confirmamos tu cuenta.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthConfirmContent />
    </Suspense>
  );
}
