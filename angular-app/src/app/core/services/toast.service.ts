import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  /** Bootstrap utility classes from the original ToastService */
  classname: string;
  title?: string;
  message: string;
  icon?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private seq = 0;
  readonly toasts = signal<Toast[]>([]);

  success(message: string, icon?: string, _link?: string): void {
    this.push('bg-success text-light', message, icon);
  }

  info(message: string, icon?: string, _link?: string): void {
    this.push('bg-info text-light', message, icon);
  }

  danger(message: string, icon?: string, _link?: string): void {
    this.push('bg-danger text-light', message, icon);
  }

  /** Alias used by newer call sites */
  error(message: string, icon?: string, _link?: string): void {
    this.danger(message, icon, _link);
  }

  warning(message: string, icon?: string, _link?: string): void {
    this.push('bg-warning text-light', message, icon);
  }

  black(message: string, icon?: string, _link?: string): void {
    this.push('bg-dark text-light border border-light', message, icon);
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private push(classname: string, message: string, icon?: string): void {
    const id = ++this.seq;
    this.toasts.update((list) => [
      { id, classname, message, icon, title: message },
      ...list,
    ]);
    setTimeout(() => this.dismiss(id), 15000);
  }
}
