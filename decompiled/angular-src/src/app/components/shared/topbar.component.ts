import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameData } from '../../models/game-data.model';
import { DataService } from '../../services/data.service';
import { SaveService } from '../../services/save.service';
import { CoreEngineService } from '../../services/core-engine.service';
import { AiEngineService } from '../../services/ai-engine.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  now = Date.now();
  private timer?: ReturnType<typeof setInterval>;

  constructor(
    public data: GameData,
    public dataService: DataService,
    private save: SaveService,
    private core: CoreEngineService,
    private ai: AiEngineService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.timer = setInterval(() => (this.now = Date.now()), 100);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  togglePause(): void {
    this.data.pause = !this.data.pause;
  }

  doSave(): void {
    this.save.save();
  }

  exit(): void {
    this.core.stop();
    try {
      this.ai.stop();
    } catch {
      /* ignore */
    }
    this.router.navigateByUrl('/home');
  }

  saveAgeSec(): number {
    return Math.floor((this.now - (this.data.savetime || this.now)) / 1000);
  }

  pop(): number {
    try {
      return this.dataService.pop();
    } catch {
      return 0;
    }
  }

  happiness(): number {
    try {
      const cities = this.dataService.player()?.cities || [];
      if (!cities.length) return 0;
      const vals = cities.map((c: any) => c.happiness ?? 0.9);
      return vals.reduce((a: number, b: number) => a + b, 0) / vals.length;
    } catch {
      return 0.9;
    }
  }
}
