import { Component, inject } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-citybuildings',
  standalone: true,
  templateUrl: './city-buildings.component.html',
  styleUrl: './city-buildings.component.scss',
})
export class CityBuildingsComponent {
  private readonly data = inject(DataService);
  buildingList = Object.values(this.data.conf.buildings)
    .slice(0, 25)
    .map((b: any) => ({
      id: b.id,
      label: typeof b.label === 'function' ? b.label() : b.label,
    }));
}
