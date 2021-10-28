import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/core/modules/store/app.state';
import { selectCurrentTripId } from 'src/app/core/modules/store/trip/trip.selectors';
import { HttpGeneralService } from 'src/app/core/services/http-general/http-general.service';
import { Bucketlist } from '../models/bucketlist.model';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(
    private httpService: HttpGeneralService,
    private store: Store<AppState>
  ) {}

  addTrip(trip: Trip): Observable<Trip> {
    return this.httpService.post<Trip>('/trips/createbucketlisttrip', trip);
  }

  loadTrips(): Observable<Trip[]> {
    return this.httpService.get<Trip[]>('/trips/gettrips');
  }

  deleteTrip(tripId: string): Observable<void> {
    return this.httpService.delete<void>('/trips/deletetrip/' + tripId);
  }

  getTrip(tripId: string): Observable<Trip> {
    return this.httpService.get<Trip>('/trips/gettrip/' + tripId);
  }
}
