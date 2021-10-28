import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, take, tap } from 'rxjs/operators';
import { MaterialComponentsConfigProviderService } from 'src/app/core/services/material-components-config-provider/material-components-config-provider.service';
import { TripService } from 'src/app/modules/trip/services/trip.service';
import { AppState } from '../app.state';
import * as TripActions from './trip.actions';
import { loadTrips } from './trip.actions';
import { selectCurrentTrip, selectCurrentTripId } from './trip.selectors';

@Injectable()
export class TripEffects {
  constructor(
    private tripService: TripService,
    private snackbar: MatSnackBar,
    private materialComponentsConfigProvider: MaterialComponentsConfigProviderService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  tripSelectEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.tripSelect),
      mergeMap((id) =>
        this.store.select(selectCurrentTrip).pipe(
          take(1),
          mergeMap((trip) =>
            trip!.fetched
              ? [TripActions.tripSelectSuccess(id)]
              : this.tripService
                  .getTrip(id.id)
                  .pipe(
                    mergeMap((loadedTrip) => [
                      TripActions.tripSelectAfterLoad(loadedTrip),
                    ])
                  )
          )
        )
      )
    )
  );

  tripSelectAfterLoadEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.tripSelectAfterLoad),
      mergeMap((loadedTrip) => [
        TripActions.tripSelectSuccess({ id: loadedTrip.id }),
      ])
    )
  );

  addTripEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.addTrip),
      mergeMap((trip) =>
        this.tripService
          .addTrip(trip)
          .pipe(
            mergeMap((addedTrip) => [TripActions.addTripSuccess(addedTrip)])
          )
      )
    )
  );

  addTripSuccessfullEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripActions.addTripSuccess),
        tap(() => {
          this.snackbar.open(
            'Trip added!',
            undefined,
            this.materialComponentsConfigProvider.snackbarConfig([
              'mat-toolbar',
              'mat-primary',
            ])
          );
          this.dialog.closeAll();
        })
      ),
    { dispatch: false }
  );

  loadTripsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.loadTrips),
      mergeMap(() =>
        this.tripService
          .loadTrips()
          .pipe(
            mergeMap((trips) => [TripActions.loadSuccess({ trips: trips })])
          )
      )
    )
  );

  deleteTripEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.deleteTrip),
      mergeMap(() =>
        this.store.select(selectCurrentTripId).pipe(
          take(1),
          mergeMap((id) =>
            this.tripService
              .deleteTrip(id!)
              .pipe(
                mergeMap(() => [
                  TripActions.deleteTripSuccess(),
                  TripActions.tripDeselect(),
                ])
              )
          )
        )
      )
    )
  );
}
