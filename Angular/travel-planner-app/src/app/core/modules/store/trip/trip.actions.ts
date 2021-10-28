import { createAction, props } from '@ngrx/store';
import { Bucketlist } from 'src/app/modules/trip/models/bucketlist.model';
import { TripPhase } from 'src/app/modules/trip/models/trip-phase.model';
import { Trip } from 'src/app/modules/trip/models/trip.model';

export const addTrip = createAction('Add trip', props<Trip>());

export const addTripSuccess = createAction('Add trip success', props<Trip>());

export const tripSelect = createAction('Trip select', props<{ id: string }>());

export const tripSelectSuccess = createAction(
  'Trip select success',
  props<{ id: string }>()
);

export const tripSelectAfterLoad = createAction(
  'Trip select after load',
  props<Trip>()
);

export const tripDeselect = createAction('Trip deselect');

export const loadTrips = createAction('Load trips');

export const loadSuccess = createAction(
  'Load success',
  props<{ trips: Trip[] }>()
);

export const deleteTrip = createAction('Delete trip');

export const deleteTripSuccess = createAction('Delete trip success');
