'use client';

import Image from 'next/image';
import type { Strategy } from '@/app/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Flame, Cloud, Sun, ShieldCheck } from 'lucide-react';
import { TtIcon, CtIcon } from './icons';

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
            {strategy.side === 'TT' ? (
                <TtIcon className="h-8 w-8 text-tt-accent" />
            ) : (
                <CtIcon className="h-8 w-8 text-ct-accent" />
            )}
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                {strategy.name}
            </h2>
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
        <div className="aspect-video w-full relative bg-card rounded-lg overflow-hidden">
          <Image
            src={strategy.imageUrl}
            alt={`Diagrama de la estrategia: ${strategy.name}`}
            fill
            sizes="(max-width: 1280px) 100vw, 50vw"
            className="object-contain"
            data-ai-hint={strategy.imageHint}
          />
        </div>
      </div>

      <div>
        <h3 className="font-headline text-2xl font-bold mb-4">Roles de Jugadores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategy.players.map((player) => (
            <Card key={player.playerTag}>
              <CardHeader>
                <CardTitle className="font-headline text-lg">{player.playerTag}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{player.roleDescription}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-headline text-xl">Granadas Requeridas</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 list-inside">
                {strategy.grenadesNeeded.map((grenade, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                        {getGrenadeIcon(grenade)}
                        {grenade}
                    </li>
                ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        {strategy.alternatives && (
            <AccordionItem value="item-2">
            <AccordionTrigger className="font-headline text-xl">Alternativas</AccordionTrigger>
            <AccordionContent>
                <p className="text-muted-foreground">{strategy.alternatives}</p>
            </AccordionContent>
            </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
