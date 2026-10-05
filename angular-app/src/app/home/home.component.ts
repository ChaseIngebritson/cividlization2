import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);

  readonly civCount = Object.keys(this.data.conf.civilizations).length;
  readonly techCount = Object.keys(this.data.conf.sciences).length;
  readonly buildingCount = Object.keys(this.data.conf.buildings).length;

  start(): void {
    this.data.initGame();
    void this.router.navigateByUrl('/game/city');
  }
}
