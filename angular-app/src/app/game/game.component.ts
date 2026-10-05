import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, LeftmenuComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {}
