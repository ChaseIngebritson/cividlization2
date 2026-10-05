import { Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';

export interface BattleReport {
  read: boolean;
  date: string;
  from: string;
  to: string;
  status: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  readonly data = inject(DataService);

  selected: BattleReport | null = null;

  get reports(): BattleReport[] {
    return (this.data.data as any).reports ?? [];
  }
}
