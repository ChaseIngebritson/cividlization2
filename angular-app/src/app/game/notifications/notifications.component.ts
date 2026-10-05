import { Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  private readonly data = inject(DataService);

  get notifications(): { text: string; icon?: string }[] {
    return (this.data.data as any).notifications ?? [];
  }
}
