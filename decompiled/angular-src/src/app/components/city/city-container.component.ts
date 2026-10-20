import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { GameData } from '../../models/game-data.model';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-citycontainer',
  templateUrl: './city-container.component.html',
  styleUrls: ['./city-container.component.css'],
})
export class CityContainerComponent {
  constructor(
    public data: GameData,
    public dataService: DataService,
    private conf: ConfigService,
  ) {}

  cities(): any[] {
    try {
      return this.dataService.player().cities || [];
    } catch {
      return [];
    }
  }

  selected(): any | null {
    const list = this.cities();
    if (!list.length) return null;
    const id = this.data.sel_cityid;
    return list.find((c) => c.id === id) || list[0];
  }

  jobs(): { id: string; label: string; bonus: string }[] {
    const citizens = this.conf.citizens || {};
    const order = ['idle', 'farmers', 'builders', 'merchants', 'scientists', 'artists', 'priests'];
    let unlocked: string[] = ['idle', 'farmers'];
    try {
      const sciences = this.dataService.player()?.sciences || {};
      // Match early-game locks from original: builders etc. unlock via tech.
      if (sciences.tanning) unlocked.push('builders');
      if (sciences.trade) unlocked.push('merchants');
      if (sciences.language || sciences.education) unlocked.push('scientists');
      if (sciences.art) unlocked.push('artists');
      if (sciences.spirituality) unlocked.push('priests');
    } catch {
      /* keep base unlocks */
    }
    return order
      .filter((id) => unlocked.includes(id) && (citizens[id] || id === 'idle' || id === 'farmers'))
      .map((id) => {
        const c = citizens[id];
        let label = id;
        try {
          label = typeof c?.name === 'function' ? c.name(this.dataService) : c?.name || id;
        } catch {
          label = id === 'farmers' ? 'Hunters-Gatherers' : id;
        }
        if (id === 'idle') label = 'Idle';
        if (id === 'farmers' && (label === 'farmers' || !label)) label = 'Hunters-Gatherers';
        return {
          id,
          label,
          bonus: id === 'idle' ? '1' : id === 'farmers' ? '1.5' : '0',
        };
      });
  }

  adjust(city: any, job: string, delta: number): void {
    city.citizens = city.citizens || {};
    if (delta > 0) {
      if ((city.citizens.idle || 0) < 1) return;
      city.citizens.idle -= 1;
      city.citizens[job] = (city.citizens[job] || 0) + 1;
    } else {
      if ((city.citizens[job] || 0) < 1) return;
      city.citizens[job] -= 1;
      city.citizens.idle = (city.citizens.idle || 0) + 1;
    }
  }

  foodRate(_city: any): number {
    return 1.3;
  }

  rename(city: any): void {
    const next = prompt('Rename city', city.name);
    if (next) city.name = next;
  }
}
