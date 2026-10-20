import { Component } from '@angular/core';

import { GameData } from '../../models/game-data.model';

@Component({
  selector: 'app-reports',
  template: `
    <div class="panel">
      <h2>Reports</h2>
      <ul class="nav-list">
        @for (r of data.reports || []; track $index) {
          <li>{{ r | json }}</li>
        }
      </ul>
    </div>
`,
})
export class ReportsComponent {
  constructor(public data: GameData) {}
}
