import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { UserEffect } from './user/user.effects';
import { UserService } from 'src/app/modules/user/services/user.service';

const storeModules = [
  StoreModule.forRoot({ userLogin: userReducer }),
  EffectsModule.forRoot([UserEffect]),
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
