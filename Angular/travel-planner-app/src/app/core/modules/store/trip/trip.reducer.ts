import { state } from '@angular/animations';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Bucketlist } from 'src/app/modules/trip/models/bucketlist.model';
import { TripPhase } from 'src/app/modules/trip/models/trip-phase.model';
import { Trip } from 'src/app/modules/trip/models/trip.model';
import * as Actions from './trip.actions';

export interface TripState extends EntityState<Trip> {
  selectedTripId: string | null;
  selectedTripPhase: TripPhase | null;
}

export function selectTripId(trip: Trip): string {
  return trip.id;
}

const adapter = createEntityAdapter<Trip>({
  selectId: selectTripId,
});

const initialState: TripState = adapter.getInitialState({
  selectedTripId: null,
  selectedTripPhase: null,
});

export const tripReducer = createReducer(
  initialState,
  on(Actions.addTripSuccess, (state: TripState, trip: Trip) =>
    adapter.addOne(trip, state)
  ),
  on(Actions.tripSelectSuccess, (state, id) => ({
    ...state,
    selectedTripPhase: state.entities[id.id]!.tripPhase,
  })),
  on(Actions.tripSelectAfterLoad, (state, trip) => adapter.setOne(trip, state)),
  on(Actions.tripSelect, (state, id) => ({
    ...state,
    selectedTripId: id.id,
  })),
  on(Actions.loadSuccess, (state, trips) => adapter.setAll(trips.trips, state)),
  on(Actions.tripDeselect, (state) => ({
    ...state,
    selectedTripId: null,
    selectedTripPhase: null,
  })),
  on(Actions.deleteTripSuccess, (state) =>
    adapter.removeOne(state.selectedTripId!, state)
  )
);
