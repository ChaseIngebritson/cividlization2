import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  readonly data = inject(DataService);
}
