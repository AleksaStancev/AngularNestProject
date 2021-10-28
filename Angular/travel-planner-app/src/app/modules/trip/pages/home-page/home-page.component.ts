import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/core/modules/store/app.state';
import { loadTrips } from 'src/app/core/modules/store/trip/trip.actions';
import {
  selectBucketlistTrips,
  selectCurrentTrip,
  selectCurrentTripPhase,
} from 'src/app/core/modules/store/trip/trip.selectors';
import { MaterialComponentsConfigProviderService } from 'src/app/core/services/material-components-config-provider/material-components-config-provider.service';
import { NewTripDialogComponent } from '../../components/new-trip-dialog/new-trip-dialog.component';
import { TripListComponent } from '../../components/trip-list/trip-list.component';
import { TripPhase } from '../../models/trip-phase.model';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  @ViewChildren('tripList') tripLists!: TripListComponent[];

  bucketlistTrips: Observable<Trip[]>;
  selectedTripPhase: Observable<TripPhase | null>;
  selectedTrip: Observable<Trip | null>;
  tripPhase = TripPhase;
  constructor(
    private dialog: MatDialog,
    private materialComponentsConfigProvider: MaterialComponentsConfigProviderService,
    public store: Store<AppState>
  ) {
    this.bucketlistTrips = store.select(selectBucketlistTrips);
    this.selectedTripPhase = store.select(selectCurrentTripPhase);
    this.selectedTrip = store.select(selectCurrentTrip);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTrips());
  }

  addNewTrip(): void {
    this.dialog.open(
      NewTripDialogComponent,
      this.materialComponentsConfigProvider.matDialogConfig('60%')
    );
  }

  onTripSelected(selectedListId: number): void {
    this.tripLists.forEach((list) => list.resetSelection(selectedListId));
  }

  updateTrip(formGroup: FormGroup) {
    console.log(formGroup.value);
  }
}
