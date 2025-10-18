// Imports para funciones del servidor (se ejecutan en el build)
import { maps } from '@/app/lib/data'; 

// Función del servidor para generar las páginas estáticas
export async function generateStaticParams() {
  return maps.map((map) => ({
    mapId: map.id,
  }));
}

// Importa el componente del cliente
import MapPageClient from './page-client';

// Renderiza el componente del cliente
export default function MapPageWrapper({ params }: { params: { mapId: string } }) {
  return <MapPageClient mapId={params.mapId} />;
}
