import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
})
export class LeftMenuComponent {
  minimized = false;

  constructor(public dataService: DataService) {}

  scienceAlert(): boolean {
    try {
      return !this.dataService.player()?.science_queue?.length;
    } catch {
      return false;
    }
  }
}
