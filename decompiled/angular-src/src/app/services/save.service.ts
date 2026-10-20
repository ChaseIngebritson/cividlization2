import { Injectable } from '@angular/core';
import { LegacySaveService } from '../legacy/game-kernel';
import { ConfigService } from './config.service';
import { GameData } from '../models/game-data.model';
import { DataService } from './data.service';

/** AES + optional gzip saves to localStorage (`$g` / CryptoJS + pako). */
@Injectable({ providedIn: 'root' })
export class SaveService extends LegacySaveService {
  constructor(conf: ConfigService, data: GameData, dataService: DataService) {
    super(conf, data, dataService);
  }
}
