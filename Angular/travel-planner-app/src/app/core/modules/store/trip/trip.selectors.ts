import { createSelector } from '@ngrx/store';
import { TripPhase } from 'src/app/modules/trip/models/trip-phase.model';
import { Trip } from 'src/app/modules/trip/models/trip.model';
import { AppState } from '../app.state';
import * as fromTrip from './trip.reducer';

export const selectTripState = createSelector(
  (state: AppState) => state.tripState,
  (trips) => trips
);

export const selectTripStateAsEntities = createSelector(
  selectTripState,
  (state) => state.entities
);

export const selectCurrentTripId = createSelector(
  selectTripState,
  (state) => state.selectedTripId
);

export const selectCurrentTripPhase = createSelector(
  selectTripState,
  (state) => state.selectedTripPhase
);

export const selectCurrentTrip = createSelector(
  selectTripStateAsEntities,
  selectCurrentTripId,
  (trips, tripId) =>
    tripId != null && trips[tripId] != null ? trips[tripId]! : null
);

export const selectTripIds = createSelector(
  selectTripStateAsEntities,
  (state) => Object.keys(state)
);

export const selectTrips = createSelector(
  selectTripStateAsEntities,
  (state) => Object.values(state).filter((trip) => trip != undefined) as Trip[]
);

export const selectBucketlistTrips = createSelector(selectTrips, (trips) =>
  trips.filter((trip) => trip.tripPhase === TripPhase.bucketList)
);
