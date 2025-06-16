"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthConfirmPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuthComplete = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error al confirmar la autenticación:", error);
        router.push("/login?error=auth");
      } else {
        router.push("/dashboard");
      }
    };

    handleAuthComplete();
  }, [router, supabase.auth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Confirmando autenticación...
        </h1>
        <div className="w-16 h-16 border-4 border-t-[#10B981] border-gray-200 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
