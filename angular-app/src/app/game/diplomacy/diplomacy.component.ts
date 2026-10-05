import { Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-diplomacy',
  standalone: true,
  templateUrl: './diplomacy.component.html',
  styleUrl: './diplomacy.component.scss',
})
export class DiplomacyComponent {
  private readonly data = inject(DataService);

  tab: 'diplomacy' | 'influence' | 'trade' | 'wonders' | 'stats' = 'diplomacy';

  get relations(): any[] {
    return (this.data.data as any).relations ?? [];
  }

  get trades(): any[] {
    return (this.data.data as any).trades ?? [];
  }

  readonly maxTradeRoutes = 1;

  get globalCities(): number {
    return (this.data.data.cities ?? []).length;
  }

  get globalPop(): number {
    return this.data.pop?.() ?? 0;
  }

  /** Wonder buildings from conf (not yet owned in stub game state). */
  readonly wonders = Object.values(this.data.conf.buildings)
    .filter((b: any) => b.wonder)
    .map((b: any) => ({
      id: b.id,
      label: typeof b.label === 'function' ? b.label() : b.label,
      owner: '',
      city: '',
    }));

  get ownedWonderCount(): number {
    return this.wonders.filter((w) => w.owner).length;
  }
}
