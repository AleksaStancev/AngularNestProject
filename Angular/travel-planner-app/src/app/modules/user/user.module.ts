import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { AppStoreModule } from 'src/app/core/modules/store/app-store.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CreateUserPageComponent } from './pages/create-user-page/create-user-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserFormComponent,
    LoginPageComponent,
    CreateUserPageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class UserModule {}
