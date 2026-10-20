import { Injectable, OnDestroy } from '@angular/core';
import { LegacyCoreEngine } from '../legacy/game-kernel';
import { ConfigService } from './config.service';
import { GameData } from '../models/game-data.model';
import { DataService } from './data.service';
import { ToastService } from './toast.service';
import { SaveService } from './save.service';

/** Main 100ms / 60s simulation loop (`vv`). */
@Injectable({ providedIn: 'root' })
export class CoreEngineService extends LegacyCoreEngine implements OnDestroy {
  constructor(
    conf: ConfigService,
    data: GameData,
    dataService: DataService,
    toast: ToastService,
    save: SaveService,
  ) {
    super(conf, data, dataService, toast, save);
  }

  override ngOnDestroy(): void {
    this.stop();
  }
}
