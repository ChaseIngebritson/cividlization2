import { Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-deity',
  standalone: true,
  templateUrl: './deity.component.html',
  styleUrl: './deity.component.scss',
})
export class DeityComponent {
  private readonly data = inject(DataService);

  readonly deities = Object.values(this.data.conf.deities).map((d: any) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    color: d.color,
    icon: d.icon,
  }));
}
