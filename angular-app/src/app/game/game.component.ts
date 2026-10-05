import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { SpellsComponent } from './spells/spells.component';
import { ToastsComponent } from '../shared/toasts/toasts.component';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TopbarComponent, LeftmenuComponent, SpellsComponent, ToastsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  readonly data = inject(DataService);
}
