import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { BucketlistComponent } from './components/bucketlist/bucketlist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { PlansComponent } from './components/plans/plans.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { InProgressComponent } from './components/in-progress/in-progress.component';

@NgModule({
  declarations: [
    HomePageComponent,
    TripListComponent,
    BucketlistComponent,
    ButtonGroupComponent,
    PlansComponent,
    TripFormComponent,
    InProgressComponent,
  ],
  imports: [CommonModule, TripRoutingModule, MaterialModule, SharedModule],
})
export class TripModule {}
