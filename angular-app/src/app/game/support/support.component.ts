import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  standalone: true,
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss',
})
export class SupportComponent {
  kredAmounts = [10, 20, 50, 100, 200, 500, 1000];
}
