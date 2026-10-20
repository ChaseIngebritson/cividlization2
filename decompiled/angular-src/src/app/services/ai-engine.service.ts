import { Injectable, OnDestroy } from '@angular/core';
import { LegacyAiEngine } from '../legacy/game-kernel';
import { ConfigService } from './config.service';
import { GameData } from '../models/game-data.model';
import { DataService } from './data.service';
import { ToastService } from './toast.service';

/** AI diplomacy / empire tick (`qv`, interval = conf.ait). */
@Injectable({ providedIn: 'root' })
export class AiEngineService extends LegacyAiEngine implements OnDestroy {
  constructor(
    conf: ConfigService,
    data: GameData,
    dataService: DataService,
    toast: ToastService,
  ) {
    super(conf, data, dataService, toast);
  }

  override ngOnDestroy(): void {
    try {
      this.stop();
    } catch {
      /* subscription may not exist yet */
    }
  }
}
