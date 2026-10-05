import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private seq = 0;
  readonly toasts = signal<Toast[]>([]);

  success(message: string, title?: string): void {
    this.push('success', message, title);
  }

  error(message: string, title?: string): void {
    this.push('error', message, title);
  }

  info(message: string, title?: string): void {
    this.push('info', message, title);
  }

  warning(message: string, title?: string): void {
    this.push('warning', message, title);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private push(type: Toast['type'], message: string, title?: string): void {
    const id = ++this.seq;
    this.toasts.update((list) => [...list, { id, type, message, title }]);
    setTimeout(() => this.dismiss(id), 4000);
  }
}
