import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: '', component: DashboardLayoutComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to dashboard
    { path: 'home', component: DashboardComponent },
    { path: 'lokacije', component: LocationsComponent },
    { path: 'postavke', component: SettingsComponent },
]},
{ path: '**', redirectTo: '/dashboard/home' }  // Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
