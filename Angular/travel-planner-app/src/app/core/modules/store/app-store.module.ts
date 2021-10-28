import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { UserEffect } from './user/user.effects';
import { UserService } from 'src/app/modules/user/services/user.service';
import { tripReducer } from './trip/trip.reducer';
import { TripEffects } from './trip/trip.effects';

const storeModules = [
  StoreModule.forRoot({ userLogin: userReducer, tripState: tripReducer }),
  EffectsModule.forRoot([UserEffect, TripEffects]),
  StoreDevtoolsModule.instrument({
    maxAge: 20,
    logOnly: environment.production,
  }),
  !environment.production ? StoreDevtoolsModule.instrument() : [],
];

const storeServices = [UserService];

@NgModule({
  declarations: [],
  providers: [storeServices],
  imports: [CommonModule, storeModules],
  exports: [storeModules],
})
export class AppStoreModule {}
