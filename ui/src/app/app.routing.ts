import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dash',
        pathMatch: 'full'
    },
    {
        path: 'dash',
        component: DashboardComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
