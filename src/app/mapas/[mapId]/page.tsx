// src/app/[mapId]/page.tsx

import { maps } from '@/app/lib/data';

// --- CÓDIGO AÑADIDO PARA EL BUILD ESTÁTICO ---
// Esta función le dice a Next.js qué páginas de mapas debe generar
export async function generateStaticParams() {
  return maps.map((map) => ({
    mapId: map.id,
  }));
}
// --- FIN DEL CÓDIGO AÑADIDO ---


'use client';

import { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
// La importación de 'maps' se elimina de aquí porque ya está arriba
import { strategies as allStrategies } from '@/app/lib/data';
import type { Strategy, Side, MapId } from '@/app/lib/types';
import StrategyList from '@/app/components/strategy-list';
import StrategyDetail from '@/app/components/strategy-detail';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MapPage() {
  const params = useParams();
  const mapId = params.mapId as MapId;

  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [sideFilter, setSideFilter] = useState<Side | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const map = useMemo(() => maps.find((m) => m.id === mapId), [mapId]);

  const mapStrategies = useMemo(() => {
    return allStrategies.filter((s) => s.mapId === mapId);
  }, [mapId]);

  const filteredStrategies = useMemo(() => {
    return mapStrategies
      .filter((s) => sideFilter === 'all' || s.side === sideFilter)
      .filter((s) => categoryFilter === 'all' || s.category === categoryFilter);
  }, [mapStrategies, sideFilter, categoryFilter]);

  const categories = useMemo(() => {
    const allCats = mapStrategies.map((s) => s.category);
    return ['all', ...Array.from(new Set(allCats))];
  }, [mapStrategies]);

  if (!map) {
    notFound();
  }
  
  const handleSelectStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  }

  const mapColorClass = `bg-map-${map.id}`;
  const mapBorderColorClass = `border-map-${map.id}`;

  return (
    <div className="flex flex-col h-screen bg-background">
      <header
        className={`flex items-center justify-between p-4 shadow-md text-primary-foreground ${mapColorClass}`}
      >
        <Button asChild variant="ghost" size="icon" className="hover:bg-black/20">
            <Link href="/" aria-label="Volver a la selección de mapa">
                <ArrowLeft className="h-6 w-6" />
            </Link>
        </Button>
        <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
          {map.name}
        </h1>
        <div className="w-10"></div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-full md:w-4/12 lg:w-[30%] border-r border-border flex flex-col">
          <StrategyList
            strategies={filteredStrategies}
            onSelectStrategy={handleSelectStrategy}
            selectedStrategyId={selectedStrategy?.id}
            sideFilter={sideFilter}
            setSideFilter={setSideFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={categories}
          />
        </aside>
        
        <main className="w-full md:w-8/12 lg:w-[70%] overflow-y-auto">
            <StrategyDetail strategy={selectedStrategy} />
        </main>
      </div>
    </div>
  );
}