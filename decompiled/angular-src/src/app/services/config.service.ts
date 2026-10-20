import { Injectable } from '@angular/core';
import { GameConfig } from '../legacy/game-kernel';

/** Full balance/content tables from the shipped bundle (`Tg`). */
@Injectable({ providedIn: 'root' })
export class ConfigService extends GameConfig {
  constructor() {
    super();
  }
}
