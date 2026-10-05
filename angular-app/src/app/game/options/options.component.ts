import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent implements OnInit {
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

  ngOnInit(): void {
    const g = this.data.data;
    this.difficulty = g.difficulty ?? 2;
    this.noRespawn = !!g.no_respawn;
    this.noStats = !!g.nostats;
    this.darkTheme = !!g.darktheme;
    this.notifPop = g.notif_pop !== false;
    this.notifBuilding = g.notif_building !== false;
    this.maxReports = g.max_rpt ?? 50;
    this.maxNotifs = g.max_notif ?? 100;
    this.autoPause = { ...this.autoPause, ...(g.autopause ?? {}) };
  }

  saveGame(): void {
    this.data.data.difficulty = this.difficulty;
    this.data.data.no_respawn = this.noRespawn;
    this.data.data.nostats = this.noStats;
    this.data.persist();
    this.flashSaved();
  }

  saveUi(): void {
    this.data.data.darktheme = this.darkTheme;
    this.data.data.autopause = { ...this.autoPause };
    this.data.data.notif_pop = this.notifPop;
    this.data.data.notif_building = this.notifBuilding;
    this.data.data.max_rpt = Math.max(5, this.maxReports);
    this.data.data.max_notif = Math.max(5, this.maxNotifs);
    this.data.persist();
    this.flashSaved();
  }

  private flashSaved(): void {
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }
}
