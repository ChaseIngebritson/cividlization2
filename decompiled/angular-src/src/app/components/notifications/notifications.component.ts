import { Component } from '@angular/core';

import { GameData } from '../../models/game-data.model';

@Component({
  selector: 'app-notifications',
  template: `
    <div class="panel">
      <h2>Notifications</h2>
      <ul class="nav-list">
        @for (n of data.notifications?.slice().reverse() || []; track $index) {
          <li>{{ n.text }}</li>
        }
      </ul>
    </div>
`,
})
export class NotificationsComponent {
  constructor(public data: GameData) {}
}
