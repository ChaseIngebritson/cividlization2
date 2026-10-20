import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfigService } from '../../services/config.service';
import { GameData } from '../../models/game-data.model';
import { SaveService } from '../../services/save.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],
})
export class OptionsComponent {
  tab: 'game' | 'ui' = 'game';

  constructor(
    public conf: ConfigService,
    public data: GameData,
    private save: SaveService,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  difficulties(): any[] {
    const d = this.conf.difficulties || {};
    return Object.keys(d).map((id) => ({
      id: isNaN(+id) ? id : +id,
      ...d[id],
    }));
  }

  safe(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html || '');
  }

  doSave(): void {
    this.save.save();
  }

  restart(): void {
    if (!confirm('Restart this run without prestige gains?')) return;
    try {
      const civ = this.dataService.player().civ_id;
      const name = this.data.name;
      const diff = this.data.difficulty;
      this.data.newGame(name, diff, civ);
      this.router.navigateByUrl('/game/city');
    } catch {
      /* ignore */
    }
  }
}
