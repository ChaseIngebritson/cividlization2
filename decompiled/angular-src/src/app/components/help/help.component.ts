import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent {
  children = [
    'Citizens & Improvements',
    'Food, Health & Happiness',
    'Production & Buildings',
    'Science',
    'Culture & Social Policies',
    'Religion & Tech',
    'Gold',
    'Diplomacy & Trade',
    'War & Troops',
    'Miscellaneous',
  ];
}
