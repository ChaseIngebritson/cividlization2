import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { SaveService } from '../../services/save.service';
import { GameData } from '../../models/game-data.model';
import { ConfigService } from '../../services/config.service';

type Step = 'menu' | 'difficulty' | 'civ';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  step: Step = 'menu';
  name = '';
  civId = '';
  difficulty: string | number = 2;
  saves: { name: string; raw: string }[] = [];
  error = '';

  constructor(
    public dataService: DataService,
    public conf: ConfigService,
    private data: GameData,
    private save: SaveService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const civs = Object.keys(this.conf.civilizations || {});
    this.civId = civs[0] || '';
    this.difficulty = 2;
    this.refreshSaves();
  }

  difficulties(): { id: string | number; name: string; description: string }[] {
    const d = this.conf.difficulties || {};
    return Object.keys(d).map((id) => ({
      id: isNaN(+id) ? id : +id,
      name: d[id].name,
      description: d[id].description || '',
    }));
  }

  civEntries(): any[] {
    return Object.values(this.conf.civilizations || {});
  }

  safeDesc(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html.replace(/\n/g, '<br/>'));
  }

  refreshSaves(): void {
    this.saves = [];
    const prefix = this.conf.save.prefix;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        this.saves.push({
          name: key.slice(prefix.length),
          raw: localStorage.getItem(key) || '',
        });
      }
    }
  }

  openNew(): void {
    this.step = 'difficulty';
    this.error = '';
  }

  backMenu(): void {
    this.step = 'menu';
  }

  nextFromDifficulty(): void {
    if (!this.name.trim()) {
      this.error = 'Enter a name';
      return;
    }
    this.error = '';
    this.step = 'civ';
  }

  startGame(): void {
    if (!this.civId) {
      this.error = 'Choose a civilization';
      return;
    }
    try {
      this.data.newGame(this.name.trim(), this.difficulty, this.civId);
      this.dataService.cityCache?.();
      this.dataService.checkLocks?.();
      this.router.navigateByUrl('/game/city');
    } catch (e: any) {
      this.error = e?.message || String(e);
    }
  }

  loadSave(entry: { name: string; raw: string }): void {
    try {
      const parsed = JSON.parse(entry.raw);
      this.save.load(parsed.data);
      this.router.navigateByUrl('/game/city');
    } catch (e: any) {
      this.error = e?.message || String(e);
    }
  }

  onExportFile(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result || '');
        const parsed = JSON.parse(text);
        const cipher = parsed.data || parsed;
        this.save.load(typeof cipher === 'string' ? cipher : JSON.stringify(cipher));
        this.router.navigateByUrl('/game/city');
      } catch (e: any) {
        this.error = e?.message || String(e);
      }
    };
    reader.readAsText(file);
  }
}
