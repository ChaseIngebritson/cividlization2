import { Component, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CoreEngineService } from '../../services/core-engine.service';
import { GameData } from '../../models/game-data.model';
import { ConfigService } from '../../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spells',
  template: `
    @if (display() && spells().length && !data.spellshidden) {
      <aside class="panel spells">
        <header>
          Spells
          <button type="button" (click)="data.spellshidden = true">hide</button>
        </header>
        <ul class="nav-list">
          @for (s of spells(); track s.id) {
            <li>
              <a href="#" (click)="$event.preventDefault(); use(s)">{{ s.name || s.id }}</a>
            </li>
          }
        </ul>
      </aside>
    } @else if (display() && spells().length) {
      <button class="show" type="button" (click)="data.spellshidden = false">Spells</button>
    }
  `,
  styles: [
    `
      .spells {
        width: 10rem;
        flex-shrink: 0;
      }
      .show {
        position: fixed;
        right: 0.5rem;
        bottom: 4rem;
      }
    `,
  ],
})
export class SpellsComponent {
  constructor(
    public data: GameData,
    private conf: ConfigService,
    private dataService: DataService,
    private core: CoreEngineService,
    private router: Router,
  ) {}

  display(): boolean {
    const url = this.router.url || '';
    return (
      url.startsWith('/game/empire') ||
      url.startsWith('/game/city') ||
      url.startsWith('/game/science') ||
      url.startsWith('/game/policies') ||
      url.startsWith('/game/world') ||
      url.startsWith('/game/attacks') ||
      url.startsWith('/game/diplomacy') ||
      url.startsWith('/game/powers')
    );
  }

  spells(): any[] {
    try {
      const deity = this.dataService.player().deity;
      return Object.values(this.conf.spells || {}).filter(
        (s: any) => s.deity == deity,
      );
    } catch {
      return [];
    }
  }

  use(spell: any): void {
    try {
      this.dataService.useSpell(spell, this.core);
    } catch {
      /* ignore */
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(ev: KeyboardEvent): void {
    if ((ev.target as HTMLElement)?.tagName?.toUpperCase() === 'INPUT') return;
    let idx = -1;
    if (ev.keyCode >= 49 && ev.keyCode <= 51) idx = ev.keyCode - 49;
    if (ev.keyCode >= 97 && ev.keyCode <= 99) idx = ev.keyCode - 97;
    if (idx < 0) return;
    const list = this.spells();
    if (list[idx]) this.use(list[idx]);
  }
}
