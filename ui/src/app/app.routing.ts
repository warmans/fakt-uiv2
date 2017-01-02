import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {VenuesComponent} from './component/venues/venues.component';
import {LoginComponent} from './component/login/login.component';
import {EventComponent} from './component/event/event.component';
import {PerformerComponent} from "./component/performer/performer.component";

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/browse',
    pathMatch: 'full'
  },
  {
    path: 'browse',
    component: DashboardComponent,

  }, {
    path: 'venues',
    component: VenuesComponent,
  }, {
    path: 'event/:id',
    component: EventComponent,
  }, {
    path: 'performer/:id',
    component: PerformerComponent,
  }, {
    path: 'login',
    component: LoginComponent,
  }, {
    path: "**",
    redirectTo: '/browse',//todo: 404 page?
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
