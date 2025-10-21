// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import prisma from '@/app/lib/prisma';
// ❌ Eliminadas: import { auth } from '@/auth'; 
// ❌ Eliminadas: import { SignIn, SignOut } from '@/components/auth-components'; 

// Función para obtener los mapas desde Prisma
async function getMaps() {
  const maps = await prisma.map.findMany();
  return maps;
}

export default async function Home() {
  // ❌ Eliminada: const session = await auth(); 
  const maps = await getMaps();

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      
      {/* ❌ ELIMINADA: Toda la sección de LOGIN que usaba session */}

      <header className="text-center mb-10 md:mb-16">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
          R4N Playbook
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Selecciona un mapa para ver las estrategias. La victoria se planifica.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {maps.map((map) => (
          <Link href={`/${map.id}`} key={map.id} className="group">
            <Card
              className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]"
              style={
                {
                  '--map-color': map.colorHex,
                } as React.CSSProperties
              }
            >
              <div className="relative h-48 w-full">
                <Image
                  src={map.imageUrl}
                  alt={`Imagen del mapa ${map.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <CardHeader
                className="!p-6 flex-1 flex flex-row justify-between items-center border-t-4"
                style={{ borderColor: 'var(--map-color)' }}
              >
                <CardTitle className="font-headline text-2xl tracking-tight">
                  {map.name}
                </CardTitle>
                <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[--map-color]" />
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}