'use client';

import type { Strategy, Side } from '@/app/lib/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TtIcon, CtIcon } from '@/app/components/icons';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface StrategyListProps {
  strategies: Strategy[];
  onSelectStrategy: (strategy: Strategy) => void;
  selectedStrategyId?: string;
  sideFilter: Side | 'all';
  setSideFilter: (side: Side | 'all') => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
}

export default function StrategyList({
  strategies,
  onSelectStrategy,
  selectedStrategyId,
  sideFilter,
  setSideFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
}: StrategyListProps) {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b">
        <h2 className="font-headline text-lg font-semibold mb-4">Jugadas</h2>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={sideFilter === 'all' ? 'secondary' : 'outline'}
              onClick={() => setSideFilter('all')}
              className="w-full"
            >
              Todos
            </Button>
            <Button
              variant={sideFilter === 'TT' ? 'secondary' : 'outline'}
              onClick={() => setSideFilter('TT')}
              className="w-full flex items-center gap-2"
            >
              <TtIcon className="h-4 w-4 text-tt-accent" />
              TT
            </Button>
            <Button
              variant={sideFilter === 'CT' ? 'secondary' : 'outline'}
              onClick={() => setSideFilter('CT')}
              className="w-full flex items-center gap-2"
            >
              <CtIcon className="h-4 w-4 text-ct-accent" />
              CT
            </Button>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar por categoría..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'Todas las categorías' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <ul className="p-2 space-y-1">
          {strategies.length > 0 ? (
            strategies.map((strategy) => (
              <li key={strategy.id}>
                <button
                  onClick={() => onSelectStrategy(strategy)}
                  className={cn(
                    'w-full text-left p-3 rounded-md transition-colors flex items-start gap-3',
                    selectedStrategyId === strategy.id
                      ? 'bg-primary/20'
                      : 'hover:bg-accent'
                  )}
                >
                  {strategy.side === 'TT' ? (
                    <TtIcon className="h-5 w-5 mt-0.5 shrink-0 text-tt-accent" />
                  ) : (
                    <CtIcon className="h-5 w-5 mt-0.5 shrink-0 text-ct-accent" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold leading-tight">{strategy.name}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">{strategy.category}</Badge>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-muted-foreground">No se encontraron jugadas.</li>
          )}
        </ul>
      </ScrollArea>
    </div>
  );
}
