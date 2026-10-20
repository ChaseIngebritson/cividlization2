import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { CityContainerComponent } from './components/city/city-container.component';
import { CityBuildingsComponent } from './components/city/city-buildings.component';
import { CityTroopsComponent } from './components/city/city-troops.component';
import { CityTopMenuComponent } from './components/city/city-topmenu.component';
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
import { SpellsComponent } from './components/spells/spells.component';
import { ToastsComponent } from './components/shared/toasts.component';
import { LeftMenuComponent } from './components/shared/left-menu.component';
import { TopbarComponent } from './components/shared/topbar.component';
import { FormatNumberPipe, FormatTimePipe, FormatPercentPipe } from './pipes/format.pipes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    CityContainerComponent,
    CityBuildingsComponent,
    CityTroopsComponent,
    CityTopMenuComponent,
    ScienceComponent,
    WorldComponent,
    AttacksComponent,
    DiplomacyComponent,
    PoliciesComponent,
    PowersComponent,
    SimulatorComponent,
    ReportsComponent,
    NotificationsComponent,
    HelpComponent,
    SupportComponent,
    OptionsComponent,
    DailyComponent,
    DeityComponent,
    SpellsComponent,
    ToastsComponent,
    LeftMenuComponent,
    TopbarComponent,
    FormatNumberPipe,
    FormatTimePipe,
    FormatPercentPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
