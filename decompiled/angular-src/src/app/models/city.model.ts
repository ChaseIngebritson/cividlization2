/** Reconstructed from minified class `Ag` (bundle). */
export class City {
  buildings: Record<string, { done?: boolean; progress?: number }> = {};
  building_queue: string[] = [];
  troops: Record<string, number> = {};
  troops_progress: Record<string, number> = {};
  troop_queue: string[] = [];
  id: number;
  capital: boolean;
  name: string;
  x: number;
  y: number;
  food = 0;
  gold = 0;
  bonus = '';
  ownerid: number;
  rightful_ownerid: number;
  citizens = {
    idle: 1,
    farmers: 0,
    builders: 0,
    merchants: 0,
    scientists: 0,
    artists: 0,
    priests: 0,
  };
  autoassign: boolean;
  autoassign_options: Record<string, unknown> = {};
  happiness?: number;
  tradeGains?: unknown;
  cultureDiff?: unknown;
  autobuild?: boolean;

  constructor(
    id: number,
    name: string,
    x: number,
    y: number,
    ownerid: number,
    autoassign: boolean,
    capital = false,
  ) {
    this.id = id;
    this.capital = capital;
    this.name = name;
    this.x = x;
    this.y = y;
    this.ownerid = ownerid;
    this.rightful_ownerid = ownerid;
    this.autoassign = autoassign;
  }
}
