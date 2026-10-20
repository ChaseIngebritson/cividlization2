import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-citytopmenu',
  template: `@if (city) { <div class="sr-only">{{ city.name }}</div> }`,
})
export class CityTopMenuComponent {
  @Input() city: any;
}
