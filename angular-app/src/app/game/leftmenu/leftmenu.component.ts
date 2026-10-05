import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-leftmenu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './leftmenu.component.html',
  styleUrl: './leftmenu.component.scss',
})
export class LeftmenuComponent {
  readonly data = inject(DataService);

  toggle(): void {
    this.data.data['lefthidden'] = !this.data.data['lefthidden'];
  }
}
