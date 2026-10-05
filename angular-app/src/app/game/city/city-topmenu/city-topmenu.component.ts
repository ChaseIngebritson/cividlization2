import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-citytopmenu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './city-topmenu.component.html',
  styleUrl: './city-topmenu.component.scss',
})
export class CityTopmenuComponent {
  private readonly data = inject(DataService);
  cityName = (this.data.data as any).name || 'Capital';
}
