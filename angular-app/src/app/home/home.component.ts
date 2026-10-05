import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../core/services/data.service';
import { SaveService } from '../core/services/save.service';
import { ToastService } from '../core/services/toast.service';

interface SaveMeta {
  name: string;
  civ?: string;
  era?: string | number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly data = inject(DataService);
  private readonly savesApi = inject(SaveService);
  private readonly toasts = inject(ToastService);
  private readonly router = inject(Router);

  error: string | null = null;
  loading = false;
  creating = false;
  loadText = false;
  step2 = false;
  importText = '';
  saveName = '';
  selectedDifficulty = '1';
  selectedCiv = 'romans';
  nameConflict = false;
  saves: SaveMeta[] = [];

  readonly difficulties = Object.entries(this.data.conf.difficulties).map(([key, v]: [string, any]) => ({
    key,
    name: v.name,
    description: v.description,
  }));

  readonly civilizations = Object.entries(this.data.conf.civilizations).map(([key, v]: [string, any]) => ({
    key,
    name: typeof v.name === 'function' ? v.name() : v.name,
  }));

  get canContinue(): boolean {
    return !!this.savesApi.load();
  }

  startNew(): void {
    this.creating = true;
    this.step2 = false;
    this.loading = false;
    this.loadText = false;
  }

  showLoad(): void {
    this.loading = true;
    this.creating = false;
    this.loadText = false;
    const existing = this.savesApi.load();
    this.saves = existing
      ? [{ name: (existing as any).name || 'Local save', civ: existing.players?.[0]?.civ_id, era: 0 }]
      : [];
  }

  showLoadText(): void {
    this.loadText = true;
    this.loading = false;
    this.creating = false;
  }

  cancel(): void {
    this.loading = false;
    this.creating = false;
    this.loadText = false;
    this.step2 = false;
    this.importText = '';
  }

  nextStep(): void {
    this.step2 = true;
  }

  continueGame(): void {
    if (!this.data.hydrate()) {
      this.toasts.warning('No save found');
      return;
    }
    void this.router.navigateByUrl('/game/city');
  }

  loadExported(): void {
    const parsed = this.savesApi.importJson(this.importText);
    if (!parsed) return;
    this.data.data = parsed;
    this.toasts.success('Save loaded');
    void this.router.navigateByUrl('/game/city');
  }

  loadSave(_save: SaveMeta): void {
    this.continueGame();
  }

  deleteSave(_save: SaveMeta, ev: Event): void {
    ev.stopPropagation();
    this.savesApi.clear();
    this.saves = [];
    this.toasts.info('Save deleted');
  }

  civName(id: string): string {
    const c = this.data.conf.civilizations[id];
    return c ? (typeof c.name === 'function' ? c.name() : c.name) : id;
  }

  eraName(id: string | number): string {
    const e = this.data.conf.eras[String(id)];
    return e?.name ?? String(id);
  }

  start(): void {
    this.data.initGame();
    if (this.data.data.players[0]) {
      this.data.data.players[0].civ_id = this.selectedCiv;
      (this.data.data as any).name = this.saveName || 'Player';
      (this.data.data as any).difficulty = this.selectedDifficulty;
    }
    this.data.persist();
    void this.router.navigateByUrl('/game/city');
  }
}
