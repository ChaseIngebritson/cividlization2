import { Component } from '@angular/core';

import { ConfigService } from '../../services/config.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-deity',
  template: `
    <div class="panel">
      <h2>Deity selection</h2>
      <ul class="nav-list">
        @for (d of deities(); track d.id) {
          <li><a href="#" (click)="$event.preventDefault(); pick(d)">{{ d.name || d.id }}</a></li>
        }
      </ul>
    </div>
`,
})
export class DeityComponent {
  constructor(public conf: ConfigService, private dataService: DataService) {}
  deities(): any[] { return Object.values(this.conf.deities || {}); }
  pick(d: any): void {
    try { this.dataService.player().deity = d.id; } catch {}
  }
}
