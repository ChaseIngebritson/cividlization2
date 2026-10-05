import { Component, inject } from '@angular/core';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-citytroops',
  standalone: true,
  templateUrl: './city-troops.component.html',
  styleUrl: './city-troops.component.scss',
})
export class CityTroopsComponent {
  private readonly data = inject(DataService);
  unitList = Object.values(this.data.conf.units).map((u: any) => ({
    id: u.id,
    name: typeof u.name === 'function' ? u.name({ civ_id: this.data.player().civ_id }) : u.name,
  }));
}
