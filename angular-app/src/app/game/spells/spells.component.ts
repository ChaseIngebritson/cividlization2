import { Component, HostListener, inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { mg } from '../../core/utils/mg';

interface SpellTip {
  title: string;
  id: string;
  desc: string;
  lockDesc: string;
  level: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss',
})
export class SpellsComponent {
  readonly dataService = inject(DataService);
  private readonly router = inject(Router);

  readonly conf = this.dataService.conf;
  readonly icons = this.dataService.icons;
  readonly data = this.dataService.data;

  /** Toggle mode for assigning autocast (A button). */
  autocast = false;
  tip: SpellTip | null = null;

  get player() {
    return this.dataService.player();
  }

  get spellsList(): { key: string; value: any }[] {
    return Object.entries(this.conf.spells).map(([key, value]) => ({ key, value }));
  }

  get visibleSpells(): { key: string; value: any }[] {
    const deity = this.player.deity;
    const orientation = this.player.orientation ?? -75;
    return this.spellsList.filter(
      (s) => s.value.deity === deity && 25 * (0 - s.value.level) >= orientation,
    );
  }

  get showAutocast(): boolean {
    return (this.player.orientation ?? -75) <= -100;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(ev: KeyboardEvent): void {
    const tag = (ev.target as HTMLElement)?.tagName?.toUpperCase();
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    let idx = -1;
    if (ev.keyCode >= 49 && ev.keyCode <= 51) idx = ev.keyCode - 49;
    if (ev.keyCode >= 97 && ev.keyCode <= 99) idx = ev.keyCode - 97;
    if (idx < 0) return;

    const spells = Object.values(this.conf.spells).filter(
      (s: any) => s.deity === this.player.deity,
    ) as any[];
    const spell = spells[idx];
    if (!spell) return;
    if (25 * -spell.level >= (this.player.orientation ?? -75)) {
      this.dataService.useSpell(spell);
    }
  }

  isAvailable(spell: any): boolean {
    return this.dataService.isSpellAvailable(spell);
  }

  isLocked(spell: any): boolean {
    return this.dataService.isSpellLocked(spell);
  }

  use(spell: any): void {
    if (this.autocast) {
      this.autocast = false;
      this.data.autocast = this.data.autocast === spell.id ? '' : spell.id;
      return;
    }
    this.dataService.useSpell(spell);
  }

  toggleAutocastMode(): void {
    this.autocast = !this.autocast;
  }

  clipStyle(spell: any): Record<string, string> | null {
    const times = this.data.spelltime ?? {};
    const cds = this.data.cooldowns ?? {};
    if (times[spell.id]) {
      const pct = Math.floor((100 * (spell.time - times[spell.id])) / spell.time);
      return { 'clip-path': `inset(${pct}% 0 0 0)` };
    }
    if (cds[spell.id]) {
      const pct = Math.floor(
        (100 * cds[spell.id]) / (spell.cooldown * this.dataService.coolDownMult()),
      );
      return { 'clip-path': `inset(${pct}% 0 0 0)` };
    }
    return null;
  }

  display(): boolean {
    const url = this.router.url;
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

  hide(): void {
    this.data.spellshidden = true;
  }

  show(): void {
    this.data.spellshidden = false;
  }

  mouseenter(ev: MouseEvent, spell: any): void {
    const desc =
      typeof spell.description === 'function'
        ? spell.description(this.dataService)
        : (spell.description ?? '');
    const lockDesc = this.isLocked(spell)
      ? typeof spell.lockDesc === 'function'
        ? spell.lockDesc(this.dataService)
        : (spell.lockDesc ?? '')
      : '';
    this.tip = {
      title: spell.name,
      id: spell.id,
      desc,
      lockDesc,
      level: spell.level,
      x: ev.clientX + 12,
      y: ev.clientY - 8,
    };
  }

  mouseleave(): void {
    this.tip = null;
  }

  formatTime(seconds: number): string {
    return mg.formatTime(seconds);
  }

  iconClass(spell: any, key: string): string {
    const base = spell.icon;
    if (this.data.spelltime?.[key]) return `${base} text-success`;
    if (this.data.cooldowns?.[key]) return `${base} text-light`;
    return `${base} text-warning`;
  }
}
