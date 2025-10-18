'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { maps, strategies as allStrategies } from '@/app/lib/data';
import type { Strategy, Side, MapId } from '@/app/lib/types';
import StrategyList from '@/app/components/strategy-list';
import StrategyDetail from '@/app/components/strategy-detail';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MapPageClient({ mapId }: { mapId: MapId }) {
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
  };

  const mapColorClass = `bg-map-${map.id}`;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* --- SECCIÓN MODIFICADA --- */}
      <header
        className="flex items-center justify-between p-4 shadow-lg text-primary-foreground"
        style={{ backgroundColor: map.colorHex }} // Usamos el color del mapa como fondo
      >
        {/* Botón para Volver a la Página Principal */}
        <Button asChild variant="ghost" size="icon" className="hover:bg-black/20 rounded-full">
          <Link href="/" aria-label="Volver a la selección de mapa">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>

        {/* Título Grande y Centrado */}
        <h1 
          className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter text-white"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }} // Sombra para que resalte
        >
          {map.name}
        </h1>

        {/* Espaciador para mantener el título centrado */}
        <div className="w-10"></div>
      </header>
      {/* --- FIN DE LA SECCIÓN MODIFICADA --- */}

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