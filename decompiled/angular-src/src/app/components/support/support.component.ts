import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { KongService } from '../../services/kong.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  gifts = [10, 20, 50, 100, 200, 500, 1000];

  constructor(
    public dataService: DataService,
    private kong: KongService,
  ) {}

  buy(amount: number): void {
    try {
      this.kong.buy?.(String(amount), () => undefined);
    } catch {
      /* Kongregate unavailable */
    }
  }
}
