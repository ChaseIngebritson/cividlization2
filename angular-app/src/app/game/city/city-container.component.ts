import { Component } from '@angular/core';
import { CityTopmenuComponent } from './city-topmenu/city-topmenu.component';
import { CityBuildingsComponent } from './city-buildings/city-buildings.component';
import { CityTroopsComponent } from './city-troops/city-troops.component';

@Component({
  selector: 'app-citycontainer',
  standalone: true,
  imports: [CityTopmenuComponent, CityBuildingsComponent, CityTroopsComponent],
  templateUrl: './city-container.component.html',
  styleUrl: './city-container.component.scss',
})
export class CityContainerComponent {}
