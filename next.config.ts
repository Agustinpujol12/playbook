import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // --- Cambios para el despliegue en GitHub Pages ---
  output: 'export',
  basePath: '/playbook',

  // --- Configuración de imágenes combinada ---
  images: {
    unoptimized: true, // Necesario para la exportación estática
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // --- Tu configuración original que se mantiene ---
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;