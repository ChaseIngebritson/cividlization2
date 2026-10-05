import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './world.component.html',
  styleUrl: './world.component.scss',
})
export class WorldComponent {
  hideTradeRoutes = false;
  hideTroops = false;
}
