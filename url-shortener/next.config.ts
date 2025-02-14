import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Habilitar el modo estricto de React
  swcMinify: true,        // Habilitar el minificado con SWC
  images: {
    domains: ['example.com'],  // Si usas imágenes externas, define los dominios permitidos
  },
};

export default nextConfig;
