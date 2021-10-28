import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BucketlistComponent } from './components/bucketlist/bucketlist.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';
import { NewTripDialogComponent } from './components/new-trip-dialog/new-trip-dialog.component';
import { PlansComponent } from './components/plans/plans.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TripRoutingModule } from './trip-routing.module';

@NgModule({
  declarations: [
    HomePageComponent,
    TripListComponent,
    BucketlistComponent,
    ButtonGroupComponent,
    PlansComponent,
    TripFormComponent,
    InProgressComponent,
    NewTripDialogComponent,
  ],
  imports: [CommonModule, TripRoutingModule, MaterialModule, SharedModule],
})
export class TripModule {}
