import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent {
  private readonly data = inject(DataService);

  tab: 'game' | 'ui' = 'game';
  saved = false;
  confirmRestart = false;

  difficulty = 2;
  preventOffline = false;
  noRespawn = false;
  noStats = false;
  darkTheme = false;
  notifPop = true;
  notifBuilding = true;
  maxReports = 50;
  maxNotifs = 100;

  autoPause: Record<string, boolean> = {
    citizen: false,
    building: false,
    science: false,
    incoming: false,
    city_captured: false,
    city_lost: false,
    city_joined: false,
    plague: false,
  };

  readonly autoPauseOpts = [
    { id: 'citizen', label: 'New citizen' },
    { id: 'building', label: 'New building' },
    { id: 'science', label: 'New science' },
    { id: 'incoming', label: 'Incoming attack' },
    { id: 'city_captured', label: 'City captured' },
    { id: 'city_lost', label: 'City lost' },
    { id: 'city_joined', label: 'City joined' },
    { id: 'plague', label: 'Plague' },
  ];

  readonly difficulties = Object.entries(this.data.conf.difficulties).map(
    ([id, d]: [string, any]) => ({
      id: Number(id),
      name: d.name,
      description: d.description,
    }),
  );

  saveGame(): void {
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }

  saveUi(): void {
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }
}
