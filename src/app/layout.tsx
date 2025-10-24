// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/app/components/providers'; // <-- Importamos el nuevo componente

export const metadata: Metadata = {
  title: 'R4N Playbook',
  description: 'Playbook táctico del equipo de CS2 "R4N"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {/* Usamos el componente Providers para envolver la aplicación */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}