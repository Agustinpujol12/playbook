import type { MapInfo, Strategy } from './types';

export const maps: MapInfo[] = [
  {
    id: "dust2",
    name: "Dust 2",
    colorHex: "#F8D479",
    imageUrl: "https://picsum.photos/seed/dust2/600/400",
    imageHint: "desert landscape",
  },
  {
    id: "inferno",
    name: "Inferno",
    colorHex: "#4A90E2",
    imageUrl: "https://picsum.photos/seed/inferno/600/400",
    imageHint: "italian village",
  },
  {
    id: "mirage",
    name: "Mirage",
    colorHex: "#9013FE",
    imageUrl: "https://picsum.photos/seed/mirage/600/400",
    imageHint: "moroccan architecture",
  },
  {
    id: "ancient",
    name: "Ancient",
    colorHex: "#1B5E20",
    imageUrl: "https://picsum.photos/seed/ancient/600/400",
    imageHint: "jungle ruins",
  },
  {
    id: "train",
    name: "Train",
    colorHex: "#7ED321",
    imageUrl: "https://picsum.photos/seed/train/600/400",
    imageHint: "railyard industrial",
  },
  {
    id: "overpass",
    name: "Overpass",
    colorHex: "#F5A623",
    imageUrl: "https://picsum.photos/seed/overpass/600/400",
    imageHint: "urban park",
  },
  {
    id: "nuke",
    name: "Nuke",
    colorHex: "#D0021B",
    imageUrl: "https://picsum.photos/seed/nuke/600/400",
    imageHint: "nuclear plant",
  }
];

export const strategies: Strategy[] = [
  {
    id: "d2-tt-pistol-split-b",
    mapId: "dust2",
    side: "TT",
    category: "Pistol",
    name: "Split B por Túneles y Puertas",
    description: "Ejecución rápida en ronda de pistolas para tomar el sitio de B con una entrada dividida. El objetivo es abrumar al CT de B con velocidad y superioridad numérica.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example video
    imageUrl: "https://picsum.photos/seed/d2splitb/800/600",
    imageHint: "top-down map",
    grenadesNeeded: ["1x Flash para salir de túnel", "1x Molotov para puertas", "1x Humo para ventana de B"],
    players: [
      { playerTag: "R4N", roleDescription: "Entry Fragger #1 (Túneles). Pide la flash y entra primero para limpiar el sitio. Busca el primer contacto." },
      { playerTag: "leo", roleDescription: "Entry Fragger #2 (Túneles). Tira la flash para R4N, entra justo detrás para tradear y asegurar el plante." },
      { playerTag: "mnz", roleDescription: "Entry Fragger #1 (Puertas). Tira la molotov a las puertas para denegar la visión del CT y cruza hacia plataforma." },
      { playerTag: "kiritox", roleDescription: "Soporte (Puertas). Entra detrás de mnz, cubre el posible re-peek de puertas y ayuda a controlar el sitio." },
      { playerTag: "Mauriz", roleDescription: "Lurker / Soporte (Túneles). Tira el humo a ventana desde túneles. Aguanta la posición para cortar la rotación desde medio o A." }
    ],
    alternatives: "Si se encuentra fuerte resistencia en túneles, los jugadores pueden rotar hacia puertas para una ejecución de 5 hombres."
  },
  {
    id: "d2-ct-eco-stack-a",
    mapId: "dust2",
    side: "CT",
    category: "Eco",
    name: "Stack 4 A en Eco",
    description: "En una ronda económica, se concentra la defensa en el sitio de A, dejando a un solo jugador en B para obtener información y retrasar el avance enemigo.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    imageUrl: "https://picsum.photos/seed/d2stacka/800/600",
    imageHint: "tactical diagram",
    grenadesNeeded: ["2x Flash", "1x HE"],
    players: [
      { playerTag: "R4N", roleDescription: "Rampa. Juega agresivo para obtener información temprana." },
      { playerTag: "leo", roleDescription: "Plataforma A. Cubre el avance desde largo." },
      { playerTag: "mnz", roleDescription: "Corto. Posición de crossfire con plataforma." },
      { playerTag: "kiritox", roleDescription: "Goose. Posición de retake o para sorprender." },
      { playerTag: "Mauriz", roleDescription: "Solo B. Juega pasivo, solo para info y retrasar lo más posible." }
    ]
  },
  {
    id: "inf-tt-force-banana",
    mapId: "inferno",
    side: "TT",
    category: "Forzado",
    name: "Control de Banana Forzado",
    description: "Tomar control de banana con armas de media distancia (Force buy) para presionar el sitio de B o preparar un fake.",
    imageUrl: "https://picsum.photos/seed/infbanana/800/600",
    imageHint: "tactical diagram",
    grenadesNeeded: ["2x Molotov", "2x Flash", "1x Humo (CT)"],
    players: [
      { playerTag: "R4N", roleDescription: "Primer contacto. Usa un molotov para limpiar 'carro' y avanza con flash." },
      { playerTag: "leo", roleDescription: "Segundo en entrar. Tira el segundo molotov para sandbags y tradea a R4N." },
      { playerTag: "mnz", roleDescription: "Soporte. Tira flashes para el equipo y cubre la retirada o el avance." },
      { playerTag: "kiritox", roleDescription: "Observador de Apartamentos. Evita un flank rápido por Aps." },
      { playerTag: "Mauriz", roleDescription: "Control de Medio. Tira el humo a CT y presiona medio para dividir la atención." }
    ]
  },
  {
    id: "inf-ct-default-b",
    mapId: "inferno",
    side: "CT",
    category: "Default",
    name: "Defensa Default de B",
    description: "Setup estándar para defender el sitio de B, controlando los puntos de entrada principales y preparando un retake coordinado.",
    imageUrl: "https://picsum.photos/seed/infdefb/800/600",
    imageHint: "top-down map",
    grenadesNeeded: ["1x Incendiario", "1x Humo", "2x Flash"],
    players: [
      { playerTag: "R4N", roleDescription: "Primera línea en B. Usa el incendiario para frenar el rush de banana." },
      { playerTag: "leo", roleDescription: "Refuerzo B. Juega desde 'construction' o 'CT' para ayudar a R4N." },
      { playerTag: "mnz", roleDescription: "Ancla A. Mantiene el control de apartamentos y corto." },
      { playerTag: "kiritox", roleDescription: "Rotador. Juega en boiler/pozo para rotar rápidamente a A o B." },
      { playerTag: "Mauriz", roleDescription: "AWPer. Controla medio desde arcos o moto, buscando un pick inicial." }
    ]
  }
];
