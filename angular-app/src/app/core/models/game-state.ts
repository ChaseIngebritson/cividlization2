/** Minimal reconstructed game-state shapes (inferred from DataService usage). */

export interface PlayerState {
  id: number;
  civ_id: string;
  name?: string;
  deity: string;
  orientation?: number;
  sciences: Record<string, { done?: boolean; progress?: number }>;
  science_queue: string[];
  policies: { policies: string[]; groups?: string[] };
  gold?: number;
  culture?: number;
  prestige?: number;
  favor?: number;
  upgrades?: Record<string, number>;
  powers?: Record<string, number>;
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
  spellshidden?: boolean;
  cooldowns?: Record<string, number>;
  charging?: Record<string, number>;
  spelltime?: Record<string, number>;
  autocast?: string;
  plagueMaxCities?: number;
  burnNb?: number;
  emp_autoassign?: boolean;
  emp_priority?: string;
  emp_strong?: boolean;
  [key: string]: unknown;
}
