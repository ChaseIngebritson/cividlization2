import { Injectable } from '@angular/core';

/**
 * Stub for the Kongregate API bridge used by the original build.
 * The hosted static game still loads `kongregate_api.js`; calls fail off-platform.
 */
@Injectable({ providedIn: 'root' })
export class KongService {
  readonly available = typeof (window as unknown as { kongregate?: unknown }).kongregate !== 'undefined';

  getUserId(): string | null {
    return null;
  }

  getUsername(): string | null {
    return null;
  }

  submitStat(_name: string, _value: number): void {
    // no-op outside Kongregate
  }

  showInvitationFooter(): void {
    // no-op
  }
}
