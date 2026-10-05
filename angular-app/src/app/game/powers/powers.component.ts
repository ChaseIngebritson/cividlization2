import { Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-powers',
  standalone: true,
  templateUrl: './powers.component.html',
  styleUrl: './powers.component.scss',
})
export class PowersComponent {
  private readonly data = inject(DataService);

  tab: 'powers' | 'upgrades' = 'powers';
  readonly icons = this.data.icons;
  readonly playerName = this.data.player().name;
  readonly prestige = (this.data.data as any).prestige ?? 0;
  readonly favors: Record<string, number> = (this.data.data as any).favors?.[0] ?? {};
  readonly levels: Record<string, number> = (this.data.player() as any).powers ?? {};

  readonly deities = Object.values(this.data.conf.deities).map((d: any) => ({
    id: d.id,
    name: d.name,
    color: d.color,
  }));

  /** Favor-purchasable powers (`mysteries` / `_g` in the bundle). */
  readonly powerList = Object.values(this.data.conf.mysteries).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: typeof p.description === 'function' ? p.description(null) : p.description,
  }));

  readonly upgrades = Object.entries(this.data.conf.upgrades).map(([id, u]: [string, any]) => ({
    id,
    name: u.name,
    desc: u.desc,
    cost: u.cost,
    owned: this.data.hasUpgrade(id),
  }));

  get hasPurchasedUpgrades(): boolean {
    return this.upgrades.some((u) => u.owned);
  }
}
