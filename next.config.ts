import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones para Vercel
  swcMinify: true, // Usa SWC para minificación (más rápido que Terser)

  // Configuración de dominio permitido para imágenes si usas Image component
  images: {
    domains: ['vercel.com', 'https://sniptic.com'],

    // Añade otros dominios si necesitas cargar imágenes de ellos
  },

  // Configuración para variables de entorno
  env: {
    // Puedes añadir variables que quieras exponer directamente aquí
  },

  // Vercel Analytics si deseas activarlo (requerirá instalación de @vercel/analytics)
  // experimental: {
  //   webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
  // },
};

export default nextConfig;
