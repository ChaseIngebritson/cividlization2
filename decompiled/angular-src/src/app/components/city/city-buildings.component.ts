import { Component, Input } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-citybuildings',
  template: `
    <div class="panel">
      <h3>Buildings</h3>
      <ul class="nav-list">
        @for (id of buildingIds(); track id) {
          <li>
            {{ label(id) }}
            @if (city.buildings[id]?.done) {
              ✓
            } @else {
              ({{ city.buildings[id]?.progress || 0 | cvFormat }})
            }
          </li>
        }
      </ul>
      <h4>Queue</h4>
      <p>{{ city.building_queue?.join(', ') || 'empty' }}</p>
      <h4>Build</h4>
      <ul class="nav-list">
        @for (b of selectable(); track b.id) {
          <li>
            <a href="#" (click)="$event.preventDefault(); enqueue(b)">
              {{ b.name || b.id }} ({{ cost(b) | cvFormat }}g)
            </a>
          </li>
        }
      </ul>
    </div>
  `,
})
export class CityBuildingsComponent {
  @Input({ required: true }) city!: any;

  constructor(
    private conf: ConfigService,
    private dataService: DataService,
  ) {}

  buildingIds(): string[] {
    return Object.keys(this.city?.buildings || {});
  }

  label(id: string): string {
    return this.conf.buildings?.[id]?.name || id;
  }

  selectable(): any[] {
    try {
      return this.dataService.selectableBuildings(this.city) || [];
    } catch {
      return [];
    }
  }

  cost(b: any): number {
    try {
      return this.dataService.buildingGoldCost(b) || b.cost || 0;
    } catch {
      return b.cost || 0;
    }
  }

  enqueue(b: any): void {
    try {
      const c = this.cost(b);
      if ((this.city.gold || 0) < c) return;
      this.city.gold -= c;
      this.city.building_queue = this.city.building_queue || [];
      this.city.building_queue.push(b.id);
    } catch {
      /* ignore */
    }
  }
}
