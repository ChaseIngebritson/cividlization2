import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { CityContainerComponent } from './components/city/city-container.component';
import { ScienceComponent } from './components/science/science.component';
import { WorldComponent } from './components/world/world.component';
import { AttacksComponent } from './components/attacks/attacks.component';
import { DiplomacyComponent } from './components/diplomacy/diplomacy.component';
import { PoliciesComponent } from './components/policies/policies.component';
import { PowersComponent } from './components/powers/powers.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { HelpComponent } from './components/help/help.component';
import { SupportComponent } from './components/support/support.component';
import { OptionsComponent } from './components/options/options.component';
import { DailyComponent } from './components/daily/daily.component';
import { DeityComponent } from './components/deity/deity.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'game',
    component: GameComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'city' },
      { path: 'city', component: CityContainerComponent },
      { path: 'empire', component: CityContainerComponent },
      { path: 'science', component: ScienceComponent },
      { path: 'world', component: WorldComponent },
      { path: 'attacks', component: AttacksComponent },
      { path: 'diplomacy', component: DiplomacyComponent },
      { path: 'policies', component: PoliciesComponent },
      { path: 'powers', component: PowersComponent },
      { path: 'simulator', component: SimulatorComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'support', component: SupportComponent },
      { path: 'daily', component: DailyComponent },
      { path: 'deity', component: DeityComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
