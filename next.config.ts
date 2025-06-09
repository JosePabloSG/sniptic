import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones para Vercel
  swcMinify: true, // Usa SWC para minificación (más rápido que Terser)

 
};

export default nextConfig;
