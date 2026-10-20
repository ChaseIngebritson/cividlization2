import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { DataService } from '../../services/data.service';
import { GameData } from '../../models/game-data.model';

@Component({
  selector: 'app-science',
  templateUrl: './science.component.html',
  styleUrls: ['./science.component.css'],
})
export class ScienceComponent {
  selectedEra = 0;

  constructor(
    public conf: ConfigService,
    private dataService: DataService,
    public data: GameData,
  ) {}

  eras(): any[] {
    const eras = this.conf.eras || {};
    return Object.keys(eras)
      .map((k) => ({ id: +k || k, ...(eras[k] || { name: k }) }))
      .sort((a, b) => (+a.id || 0) - (+b.id || 0));
  }

  sciences(): any[] {
    return Object.values(this.conf.sciences || {});
  }

  /** Rough columns for prehistoric techs matching screenshot layout. */
  columns(): string[][] {
    return [
      ['language', 'dog_domestication', 'tanning', 'pottery'],
      ['trade', 'spirituality', 'mining', 'tools'],
      ['art', 'exploration', 'agriculture', 'archery'],
    ];
  }

  byId(id: string): any {
    const s = this.conf.sciences?.[id];
    return s || { id, label: this.pretty(id) };
  }

  labelOf(id: string): string {
    const s = this.byId(id);
    return s.label || s.name || this.pretty(id);
  }

  pretty(id: string): string {
    return id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  state(id: string): 'current' | 'locked' | 'available' | 'done' {
    try {
      const player = this.dataService.player();
      if (player.sciences?.[id]) return 'done';
      if (player.science_queue?.[0] === id) return 'current';
      // first column available at start
      if (this.columns()[0].includes(id)) return 'available';
      return 'locked';
    } catch {
      return this.columns()[0].includes(id) ? 'available' : 'locked';
    }
  }

  enqueue(id: string): void {
    if (this.state(id) !== 'available') return;
    try {
      const p = this.dataService.player();
      p.science_queue = p.science_queue || [];
      if (!p.science_queue.includes(id)) p.science_queue.push(id);
    } catch {
      /* ignore */
    }
  }

  clearQueue(): void {
    try {
      this.dataService.player().science_queue = [];
    } catch {
      /* ignore */
    }
  }
}
