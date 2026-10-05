/** Minimal reconstructed game-state shapes (inferred from DataService usage). */

export interface PlayerState {
  id: number;
  civ_id: string;
  name?: string;
  deity: string;
  sciences: Record<string, { done?: boolean; progress?: number }>;
  policies: { policies: string[]; groups?: string[] };
  gold?: number;
  prestige?: number;
  favor?: number;
  upgrades?: Record<string, number>;
}

export interface CityState {
  id: number;
  ownerid: number;
  name?: string;
  pop?: number;
  buildings?: Record<string, number>;
  troops?: Record<string, number>;
  autoassign_options?: {
    nogrowth?: boolean;
    priority?: string;
    strong?: boolean;
  };
}

export interface GameData {
  players: PlayerState[];
  cities: CityState[];
  turn?: number;
  version?: string;
  darktheme?: boolean;
  nostats?: boolean;
  no_respawn?: boolean;
  notif_pop?: boolean;
  notif_building?: boolean;
  max_rpt?: number;
  max_notif?: number;
  difficulty?: number;
  autopause?: Record<string, boolean>;
  emp_autoassign?: boolean;
  emp_priority?: string;
  emp_strong?: boolean;
  [key: string]: unknown;
}
