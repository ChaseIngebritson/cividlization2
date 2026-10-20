import { Injectable } from '@angular/core';
import { LegacyToastService } from '../legacy/game-kernel';
import { ConfigService } from './config.service';
import { GameData } from '../models/game-data.model';

@Injectable({ providedIn: 'root' })
export class ToastService extends LegacyToastService {
  constructor(conf: ConfigService, data: GameData) {
    super(conf, data);
  }
}
