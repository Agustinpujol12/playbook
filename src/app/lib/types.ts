export type MapId = "dust2" | "inferno" | "mirage" | "ancient" | "train" | "overpass" | "nuke";
export type Side = "TT" | "CT";

export interface PlayerRole {
  playerTag: string;
  roleDescription: string;
}

export interface Strategy {
  id: string;
  mapId: MapId;
  side: Side;
  category: string;
  name: string;
  description: string;
  videoUrl?: string;
  imageUrl: string;
  imageHint: string;
  grenadesNeeded: string[];
  players: PlayerRole[];
  alternatives?: string;
}

export interface MapInfo {
  id: MapId;
  name: string;
  colorHex: string;
  imageUrl: string;
  imageHint: string;
}
