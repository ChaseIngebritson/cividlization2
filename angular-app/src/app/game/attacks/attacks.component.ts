import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-attacks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './attacks.component.html',
  styleUrl: './attacks.component.scss',
})
export class AttacksComponent {
  private readonly data = inject(DataService);

  get attacks(): any[] {
    return (this.data.data as any).attacks ?? [];
  }
  get spies(): any[] {
    return (this.data.data as any).spies ?? [];
  }
  get scouts(): any[] {
    return (this.data.data as any).scouts ?? [];
  }
  get workers(): any[] {
    return (this.data.data as any).workers ?? [];
  }
  get goldTransfers(): any[] {
    return (this.data.data as any).goldtransfers ?? [];
  }

  get hasMovements(): boolean {
    return (
      this.attacks.length +
        this.spies.length +
        this.scouts.length +
        this.workers.length +
        this.goldTransfers.length >
      0
    );
  }
}
