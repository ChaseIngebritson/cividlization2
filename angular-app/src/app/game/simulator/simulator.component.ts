import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-simulator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './simulator.component.html',
  styleUrl: './simulator.component.scss',
})
export class SimulatorComponent {
  private readonly data = inject(DataService);

  defenderType = 0;
  population = 0;
  walls = false;
  castle = false;
  fortress = false;
  wallsResult = false;
  castleResult = false;
  fortressResult = false;

  attacking: Record<string, number> = {};
  defending: Record<string, number> = {};
  attackingResults: Record<string, number | null> = {};
  defendingResults: Record<string, number | null> = {};

  readonly combatTroops = Object.values(this.data.conf.units)
    .filter((u: any) => !u.special)
    .map((u: any) => ({
      id: u.id,
      name: typeof u.name === 'function' ? u.name(this.data.player()) : u.name,
    }));

  constructor() {
    for (const t of this.combatTroops) {
      this.attacking[t.id] = 0;
      this.defending[t.id] = 0;
      this.attackingResults[t.id] = null;
      this.defendingResults[t.id] = null;
    }
  }

  simulate(): void {
    // Stub: full combat math lives in DataService; show inputs as remaining for now.
    for (const t of this.combatTroops) {
      this.attackingResults[t.id] = this.attacking[t.id] || null;
      this.defendingResults[t.id] = this.defending[t.id] || null;
    }
    this.wallsResult = this.walls;
    this.castleResult = this.castle;
    this.fortressResult = this.fortress;
  }
}
