'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Strategy } from '@/app/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Flame, Cloud, Sun, ShieldCheck, GitBranch, Plus } from 'lucide-react'; // Importado 'Plus'
import { TtIcon, CtIcon } from './icons';
import { Button } from '@/components/ui/button'; // Importado 'Button'

interface StrategyDetailProps {
  strategy: Strategy | null;
}

const getGrenadeIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('humo')) return <Cloud className="h-4 w-4 mr-2 shrink-0" />;
  if (lowerName.includes('flash')) return <Sun className="h-4 w-4 mr-2 shrink-0" />;
  if (lowerName.includes('molotov') || lowerName.includes('incendiario')) return <Flame className="h-4 w-4 mr-2 shrink-0" />;
  return <ShieldCheck className="h-4 w-4 mr-2 shrink-0" />;
};

export default function StrategyDetail({ strategy }: StrategyDetailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  if (!strategy) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">
        <div>
          <h2 className="font-headline text-2xl">Bienvenido al Playbook</h2>
          <p className="mt-2">Selecciona una jugada de la lista para ver los detalles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-2">
            {strategy.side === 'TT' ? <TtIcon className="h-8 w-8 text-tt-accent" /> : <CtIcon className="h-8 w-8 text-ct-accent" />}
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{strategy.name}</h2>
        </div>
        <p className="text-muted-foreground">{strategy.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {strategy.videoUrl && (
            <div className="aspect-video w-full">
            <iframe
                className="w-full h-full rounded-lg"
                src={strategy.videoUrl}
                title={`Video de la estrategia: ${strategy.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>
        )}
        
        <div 
          className="aspect-video w-full relative bg-card rounded-lg overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {strategy.hoverVideoUrl ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-zoom-in group w-full h-full">
                  <video
                    ref={videoRef}
                    src={strategy.hoverVideoUrl}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] p-0 bg-transparent border-none">
                <div className="relative aspect-video w-full">
                   <video
                     src={strategy.hoverVideoUrl}
                     loop
                     muted
                     autoPlay 
                     playsInline
                     className="object-contain rounded-lg w-full h-full"
                   />
                </div>
              </DialogContent>
            </Dialog>
          ) : strategy.imageUrl ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-zoom-in group w-full h-full">
                  <Image
                    src={strategy.imageUrl}
                    alt={`Diagrama de la estrategia: ${strategy.name}`}
                    fill
                    sizes="(max-width: 1280px) 100vw, 50vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] p-0 bg-transparent border-none">
                <div className="relative aspect-video w-full">
                   <Image
                     src={strategy.imageUrl}
                     alt={`Diagrama de la estrategia: ${strategy.name}`}
                     fill
                     className="object-contain rounded-lg"
                   />
                </div>
              </DialogContent>
            </Dialog>
          ) : null }
        </div>
      </div>

      <div>
        <h3 className="font-headline text-2xl font-bold mb-4">Roles de Jugadores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {strategy.players.map((player) => (
            <Card key={player.playerTag} className="h-full flex flex-col">
              {/* --- SECCIÓN MODIFICADA --- */}
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-lg">{player.playerTag}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              {/* --- FIN DE LA SECCIÓN --- */}
              <CardContent className="flex-grow">
                <p className="text-muted-foreground break-words">{player.roleDescription}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 pt-4">
        {strategy.grenadesNeeded && strategy.grenadesNeeded.length > 0 && (
          <div>
            <h3 className="font-headline text-xl font-semibold flex items-center border-b pb-3 mb-4">
              <Flame className="h-5 w-5 mr-2" />
              Granadas Requeridas
            </h3>
            <ul className="space-y-2 pt-2">
              {strategy.grenadesNeeded.map((grenade, index) => (
                <li key={index} className="flex items-center text-muted-foreground">
                  {getGrenadeIcon(grenade)}
                  {grenade}
                </li>
              ))}
            </ul>
          </div>
        )}
        {strategy.alternatives && (
          <div>
            <h3 className="font-headline text-xl font-semibold flex items-center border-b pb-3 mb-4">
              <GitBranch className="h-5 w-5 mr-2" />
              Alternativas
            </h3>
            <p className="text-muted-foreground pt-2">{strategy.alternatives}</p>
          </div>
        )}
      </div>
    </div>
  );
}