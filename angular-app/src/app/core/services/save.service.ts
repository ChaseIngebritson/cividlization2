import { Injectable, inject } from '@angular/core';
import { ToastService } from './toast.service';
import type { GameData } from '../models/game-state';

const STORAGE_KEY = 'cividlization2.save';

/**
 * Save/load helpers. The production build used pako (zlib) + crypto-js;
 * this reconstruction stores plain JSON in localStorage for local development.
 */
@Injectable({ providedIn: 'root' })
export class SaveService {
  private readonly toasts = inject(ToastService);

  save(data: GameData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.toasts.success('Game saved');
    } catch {
      this.toasts.error('Failed to save game');
    }
  }

  load(): GameData | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as GameData) : null;
    } catch {
      this.toasts.error('Failed to load game');
      return null;
    }
  }

  exportJson(data: GameData): string {
    return JSON.stringify(data);
  }

  importJson(raw: string): GameData | null {
    try {
      return JSON.parse(raw) as GameData;
    } catch {
      this.toasts.error('Invalid save file');
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
