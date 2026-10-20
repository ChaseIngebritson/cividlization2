import { Injectable } from '@angular/core';
import { GameDataModel } from '../legacy/game-kernel';
import { ConfigService } from '../services/config.service';

/** Mutable game state from the shipped bundle (`Pg`). */
@Injectable({ providedIn: 'root' })
export class GameData extends GameDataModel {
  constructor(conf: ConfigService) {
    super(conf);
  }
}
