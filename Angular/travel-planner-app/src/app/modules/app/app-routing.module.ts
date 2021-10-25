import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { NoAuthGuard } from 'src/app/core/guards/no-auth/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/login',
    pathMatch: 'full',
  },
  {
    path: 'users',
    canLoad: [NoAuthGuard],
    loadChildren: () =>
      import('../user/user.module').then((module) => module.UserModule),
  },
  {
    path: 'trips',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('../trip/trip.module').then((module) => module.TripModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
