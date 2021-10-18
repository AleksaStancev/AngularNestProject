import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/app/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule, 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
