import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toasts></app-toasts>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
