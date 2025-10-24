// src/app/[mapId]/page-client.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Strategy, MapInfo, PlayerRole } from '@/app/lib/types';
import StrategyList from '@/app/components/strategy-list';
import StrategyDetail from '@/app/components/strategy-detail';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react'; // <-- IMPORTACIÓN AÑADIDA

interface PageClientProps {
  map: MapInfo;
  strategies: (Strategy & { players: PlayerRole[] })[];
}

export default function PageClient({ map, strategies }: PageClientProps) {
  const { data: session } = useSession(); // <-- OBTENEMOS LA SESIÓN DEL USUARIO
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(strategies[0] ?? null);
  const [sideFilter, setSideFilter] = useState<'TT' | 'CT' | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  const filteredStrategies = useMemo(() => {
    return strategies
      .filter((s) => sideFilter === 'all' || s.side === sideFilter)
      .filter((s) => categoryFilter === 'all' || s.category === categoryFilter);
  }, [strategies, sideFilter, categoryFilter]);

  const categories = useMemo(() => {
    const allCats = strategies.map((s) => s.category);
    return ['all', ...Array.from(new Set(allCats))];
  }, [strategies]);

  const handleSelectStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
  };

  const mapColorClass = `bg-map-${map.id}`;

  return (
    <div className="flex flex-col h-screen bg-background">
      <header
        className="flex items-center justify-between p-4 shadow-lg text-primary-foreground"
        style={{ backgroundColor: map.colorHex }}
      >
        <Button asChild variant="ghost" size="icon" className="hover:bg-black/20 rounded-full">
          <Link href="/" aria-label="Volver a la selección de mapa">
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 
          className="font-headline text-3xl md:text-5xl font-extrabold tracking-tighter text-white"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
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
            session={session} // <-- PASAMOS LA SESIÓN A LA LISTA
            mapId={map.id} // <-- LÍNEA AÑADIDA
          />
        </aside>
        <main className="w-full md:w-8/12 lg:w-[70%] overflow-y-auto">
          <StrategyDetail strategy={selectedStrategy} />
        </main>
      </div>
    </div>
  );
}