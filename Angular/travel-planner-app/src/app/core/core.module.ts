import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-modul-loaded-once.guard';
import { MaterialModule } from './modules/material/material.module';

const modules = [MaterialModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, modules],
  providers: [],
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
