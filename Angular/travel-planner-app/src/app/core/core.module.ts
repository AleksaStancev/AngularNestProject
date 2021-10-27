import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-model-loaded-once/ensure-modul-loaded-once.guard';
import { ErrorHandlerInterceptor } from './interceptors/error-handler/error-handler.interceptor';
import { MaterialModule } from './modules/material/material.module';
import { AppStoreModule } from './modules/store/app-store.module';

const modules = [MaterialModule, HttpClientModule, AppStoreModule];

const providers = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHandlerInterceptor,
    multi: true,
  },
  HttpClient,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  providers: [providers],
  exports: [modules],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    private ensureModuleLoadedOnceGuard: EnsureModuleLoadedOnceGuard
  ) {
    ensureModuleLoadedOnceGuard.checkIfModuleIsLoaded(parentModule);
  }
}
