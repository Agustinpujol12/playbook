import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Las configuraciones 'output: export' y 'basePath' han sido eliminadas.
  
  images: {
    // Para Vercel, la optimización de imágenes funciona, así que quitamos 'unoptimized: true'.
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
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;