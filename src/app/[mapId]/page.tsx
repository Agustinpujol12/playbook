// src/app/[mapId]/page.tsx
import prisma from '@/app/lib/prisma';
import PageClient from './page-client';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const maps = await prisma.map.findMany({ select: { id: true } });
  return maps.map((map) => ({
    mapId: map.id,
  }));
}

async function getMapData(mapId: string) {
  const map = await prisma.map.findUnique({
    where: { id: mapId },
  });

  if (!map) return null;

  const strategies = await prisma.strategy.findMany({
    where: { mapId: mapId },
    include: {
      playerRoles: true,
    },
  });

  const strategiesWithPlayers = strategies.map(s => ({
    ...s,
    players: s.playerRoles
  }));

  return { map, strategies: strategiesWithPlayers };
}

// La prop 'params' ahora se maneja como una promesa
export default async function MapPage({ params }: { params: Promise<{ mapId: string }> }) {
  // --- LÍNEAS MODIFICADAS ---
  const { mapId } = await params; // Primero esperamos los parámetros
  const data = await getMapData(mapId); // Luego los usamos
  // --- FIN DE LA MODIFICACIÓN ---

  if (!data) {
    notFound();
  }
  
  return <PageClient map={data.map} strategies={data.strategies} />;
}