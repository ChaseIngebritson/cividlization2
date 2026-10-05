import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../services/data.service';

/** Mirrors the production `canActivate` guard on the `/game` route. */
export const gameActiveGuard: CanActivateFn = () => {
  const data = inject(DataService);
  const router = inject(Router);
  if (data.data?.players?.length) {
    return true;
  }
  return router.createUrlTree(['/home']);
};
