import { Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-science',
  standalone: true,
  templateUrl: './science.component.html',
  styleUrl: './science.component.scss',
})
export class ScienceComponent {
  private readonly data = inject(DataService);
  readonly title = 'Science';

  readonly techs = Object.values(this.data.conf.sciences).map((t: any) => ({
    id: t.id,
    label: typeof t.label === 'function' ? t.label() : t.label,
    rank: t.rank,
    require: t.require ?? [],
  }));
}
