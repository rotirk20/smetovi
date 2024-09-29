import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LocationComponent } from './pages/location/location.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lokacije', component: LocationComponent },
  { path: 'kontakt', component: ContactComponent },
  { path: '**', redirectTo: '' } // Optional: handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Scroll to top on route change
    scrollOffset:[0,0]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static routes: any;
}
