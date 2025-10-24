'use client';

import { useState } from 'react';
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
import { Plus, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Session } from 'next-auth';

interface StrategyListProps {
  strategies: Strategy[];
  onSelectStrategy: (strategy: Strategy) => void;
  selectedStrategyId?: string;
  sideFilter: Side | 'all';
  setSideFilter: (side: Side | 'all') => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
  session: Session | null; // <-- Prop para recibir la sesión
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
  session, // <-- Se recibe la sesión
}: StrategyListProps) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Lógica para manejar el clic en "Agregar Jugada"
  const handleAddStrategyClick = () => {
    if (session?.user?.role === 'ADMIN') {
      setIsDialogOpen(true);
    } else {
      toast({
        variant: "destructive",
        title: "Acceso Denegado",
        description: "Solo los administradores pueden agregar nuevas jugadas.",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="p-4 border-b">
        {/* --- SECCIÓN MODIFICADA CON LÓGICA DE PERMISOS --- */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline text-lg font-semibold">Jugadas</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button size="sm" onClick={handleAddStrategyClick}> {/* El DialogTrigger es reemplazado por un botón normal con onClick */}
              <Plus className="h-4 w-4 mr-2" />
              Agregar Jugada
            </Button>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nueva Jugada</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Nombre</Label>
                  <Input id="name" placeholder="Ej: Fast A Rush" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="video" className="text-right">Video</Label>
                  <Input id="video" placeholder="URL del video en YouTube" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="gif" className="text-right">Gif</Label>
                  <Input id="gif" placeholder="URL/ruta del video corto" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requerimiento" className="text-right">Requerimiento</Label>
                  <Textarea id="requerimiento" placeholder="Granadas necesarias, separadas por comas" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="alternativa" className="text-right">Alternativa</Label>
                  <Textarea id="alternativa" placeholder="Plan B si la jugada principal falla" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit">
                  <Check className="h-4 w-4 mr-2" />
                  Aceptar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {/* --- FIN DE LA SECCIÓN MODIFICADA --- */}
        
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