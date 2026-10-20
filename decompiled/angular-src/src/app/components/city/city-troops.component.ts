import { Component, Input } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-citytroops',
  template: `
    <div class="panel">
      <h3>Troops</h3>
      <ul class="nav-list">
        @for (id of troopIds(); track id) {
          <li>{{ label(id) }}: {{ city.troops[id] | cvFormat }}</li>
        }
      </ul>
      <h4>Queue</h4>
      <p>{{ city.troop_queue?.join(', ') || 'empty' }}</p>
    </div>
  `,
})
export class CityTroopsComponent {
  @Input({ required: true }) city!: any;

  constructor(private conf: ConfigService) {}

  troopIds(): string[] {
    return Object.keys(this.city?.troops || {});
  }

  label(id: string): string {
    return this.conf.troops?.[id]?.name || id;
  }
}
