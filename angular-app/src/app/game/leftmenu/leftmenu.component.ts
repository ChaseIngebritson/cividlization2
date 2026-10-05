import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-leftmenu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './leftmenu.component.html',
  styleUrl: './leftmenu.component.scss',
})
export class LeftmenuComponent {
  items = [
    { path: '/game/city', label: 'City', icon: 'fas fa-city' },
    { path: '/game/empire', label: 'Empire', icon: 'fas fa-landmark' },
    { path: '/game/science', label: 'Science', icon: 'fas fa-flask' },
    { path: '/game/world', label: 'World', icon: 'fas fa-globe' },
    { path: '/game/attacks', label: 'Attacks', icon: 'fas fa-khanda' },
    { path: '/game/diplomacy', label: 'Diplomacy', icon: 'fas fa-handshake' },
    { path: '/game/policies', label: 'Policies', icon: 'fas fa-scroll' },
    { path: '/game/powers', label: 'Powers', icon: 'fas fa-bolt' },
    { path: '/game/deity', label: 'Deity', icon: 'fas fa-ankh' },
    { path: '/game/daily', label: 'Daily', icon: 'fas fa-gift' },
    { path: '/game/reports', label: 'Reports', icon: 'fas fa-book' },
    { path: '/game/simulator', label: 'Simulator', icon: 'fas fa-dice' },
    { path: '/game/notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { path: '/game/options', label: 'Options', icon: 'fas fa-cog' },
    { path: '/game/help', label: 'Help', icon: 'fas fa-question-circle' },
    { path: '/game/support', label: 'Support', icon: 'fas fa-life-ring' },
  ];
}
