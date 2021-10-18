import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/login',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../user/user.module').then((module) => module.UserModule),
  },
  {
    path: 'trips',
    loadChildren: () =>
      import('../trip/trip.module').then((module) => module.TripModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
