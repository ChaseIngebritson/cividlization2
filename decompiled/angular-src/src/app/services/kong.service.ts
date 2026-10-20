import { Injectable } from '@angular/core';
import { LegacyKongService } from '../legacy/game-kernel';

@Injectable({ providedIn: 'root' })
export class KongService extends LegacyKongService {
  constructor() {
    super();
  }
}
