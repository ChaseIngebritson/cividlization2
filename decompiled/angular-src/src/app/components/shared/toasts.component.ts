import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <div class="toasts" aria-live="polite" aria-atomic="true">
      @for (t of toast.toasts; track t.date) {
        <div class="toast" [class]="t.classname">
          @if (t.icon) {
            <i [class]="t.icon"></i>
          }
          {{ t.text }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      .toasts {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        max-width: 22rem;
      }
      .toast {
        padding: 0.6rem 0.8rem;
        border-radius: 4px;
        background: #333;
      }
    `,
  ],
})
export class ToastsComponent {
  constructor(public toast: ToastService) {}
}
