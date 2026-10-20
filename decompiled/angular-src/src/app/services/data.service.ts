import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LegacyDataService } from '../legacy/game-kernel';
import { ConfigService } from './config.service';
import { GameData } from '../models/game-data.model';
import { ToastService } from './toast.service';
import { KongService } from './kong.service';

/** Full gameplay API from the shipped bundle (`zg`). */
@Injectable({ providedIn: 'root' })
export class DataService extends LegacyDataService {
  constructor(
    router: Router,
    data: GameData,
    conf: ConfigService,
    toast: ToastService,
    kong: KongService,
  ) {
    super(router, data, conf, toast, kong);
  }
}
