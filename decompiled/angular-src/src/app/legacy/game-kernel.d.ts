/** Ambient types for the generated game kernel (minified class shapes). */
export const ICONS: Record<string, string>;
export const ENVIRONMENT: { production: boolean };

export class GameConfig {
  version: number;
  aes_key: string;
  ut: number;
  mut: number;
  ait: number;
  max_dt: number;
  autosave_delay: number;
  toast_delay: number;
  save: { prefix: string };
  buildings: Record<string, any>;
  sciences: Record<string, any>;
  civilizations: Record<string, any>;
  locks: Record<string, any>;
  spells: Record<string, any>;
  deities: Record<string, any>;
  troops: Record<string, any>;
  eras: Record<string, any>;
  [key: string]: any;
}

export class GameDataModel {
  constructor(conf: GameConfig);
  name: string;
  players: any[];
  pause: boolean;
  darktheme: boolean;
  savetime: number;
  lt: number;
  [key: string]: any;
  newGame(name: string, difficulty: any, civId: string): void;
  init(keepPowers?: boolean): void;
  load(saved: Record<string, unknown>): void;
}

export class PlayerModel {
  constructor(id: number, name: string);
  [key: string]: any;
}
export class CityModel {
  constructor(...args: any[]);
  [key: string]: any;
}
export class SaveRecordModel {
  constructor(...args: any[]);
  [key: string]: any;
}

export class LegacyToastService {
  constructor(conf: GameConfig, data: GameDataModel);
  toasts: any[];
  success(text: string, icon?: string, link?: string): void;
  info(text: string, icon?: string, link?: string): void;
  danger(text: string, icon?: string, link?: string): void;
  [key: string]: any;
}
export class LegacyKongService {
  constructor();
  getUsername(): string;
  [key: string]: any;
}
export class LegacyDataService {
  constructor(...args: any[]);
  player(id?: number): any;
  pop(city?: any): number;
  getStrVersion(): string;
  cityCache(): void;
  checkLocks(): void;
  updateStats(): void;
  updateVersion(): void;
  selectableBuildings(city: any): any[];
  buildingGoldCost(b: any): number;
  useSpell(spell: any, engine: any): void;
  era(): any;
  allCities(): any[];
  [key: string]: any;
}
export class LegacySaveService {
  constructor(...args: any[]);
  save(gzip?: boolean): boolean;
  load(cipher: string): void;
  delete(name: string): void;
  extractSave(name: string): any;
  encryptData(gzip?: boolean): string;
  decryptData(cipher: string): any;
  [key: string]: any;
}
export class LegacyCoreEngine {
  constructor(...args: any[]);
  start(): void;
  stop(): void;
  run(tick: number, dt?: number, forced?: boolean): void;
  ngOnDestroy?(): void;
  [key: string]: any;
}
export class LegacyAiEngine {
  constructor(...args: any[]);
  start(): void;
  stop(): void;
  ngOnDestroy?(): void;
  [key: string]: any;
}

export class FormatUtil {
  static format(value: number, config?: string): string;
  static formatTime(seconds: number): string;
  [key: string]: any;
}
export class RandomUtil {
  static roll(p: number): boolean;
  static fromArray<T>(arr: T[]): T;
  [key: string]: any;
}
export class MathUtil {
  static constraint(v: number, max?: number, min?: number): number;
}
