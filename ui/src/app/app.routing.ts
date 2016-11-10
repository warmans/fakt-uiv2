import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { VenuesComponent } from './component/venues/venues.component';
import { LoginComponent } from './component/login/login.component';

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
        path: 'login',
        component: LoginComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
