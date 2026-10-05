import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { CityContainerComponent } from './game/city/city-container.component';
import { EmpireComponent } from './game/empire/empire.component';
import { ScienceComponent } from './game/science/science.component';
import { WorldComponent } from './game/world/world.component';
import { AttacksComponent } from './game/attacks/attacks.component';
import { SimulatorComponent } from './game/simulator/simulator.component';
import { ReportsComponent } from './game/reports/reports.component';
import { PoliciesComponent } from './game/policies/policies.component';
import { NotificationsComponent } from './game/notifications/notifications.component';
import { HelpComponent } from './game/help/help.component';
import { SupportComponent } from './game/support/support.component';
import { OptionsComponent } from './game/options/options.component';
import { DiplomacyComponent } from './game/diplomacy/diplomacy.component';
import { PowersComponent } from './game/powers/powers.component';
import { DailyComponent } from './game/daily/daily.component';
import { DeityComponent } from './game/deity/deity.component';
import { gameActiveGuard } from './core/guards/game-active.guard';

/**
 * Route tree recovered from the production Angular router config.
 * Component class names are reconstructed from `app-*` selectors.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [gameActiveGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'city' },
      { path: 'empire', component: EmpireComponent },
      { path: 'city/:id', component: CityContainerComponent },
      { path: 'city', component: CityContainerComponent },
      { path: 'science', component: ScienceComponent },
      { path: 'world', component: WorldComponent },
      { path: 'attacks', component: AttacksComponent },
      { path: 'simulator', component: SimulatorComponent },
      { path: 'reports/:id', component: ReportsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'policies', component: PoliciesComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'support', component: SupportComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'diplomacy', component: DiplomacyComponent },
      { path: 'powers', component: PowersComponent },
      { path: 'daily', component: DailyComponent },
      { path: 'deity', component: DeityComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
