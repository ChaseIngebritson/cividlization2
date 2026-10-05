import { Component } from '@angular/core';

@Component({
  selector: 'app-daily',
  standalone: true,
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss',
})
export class DailyComponent {
  cards = [1, 2, 3];
}
