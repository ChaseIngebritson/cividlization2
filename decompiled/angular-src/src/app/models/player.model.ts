/** Reconstructed from minified class `Eg` (bundle). */
export class Player {
  cities: any[] = [];
  science_queue: string[] = [];
  civ_cities = 1;
  id: number;
  name: string;
  civ_id = '';
  culture = 0;
  faith = 0;
  progress = 0;
  sciences: Record<string, unknown> = {};
  policies = { groups: [] as unknown[], policies: [] as unknown[] };
  orientation = -75;
  powers: Record<string, unknown> = {};
  deity = '';
  appreciation: Record<string, unknown> = {};
  influence: Record<string, unknown> = {};
  promotion_cooldown: Record<string, unknown> = {};
  discovered: unknown[] = [];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
