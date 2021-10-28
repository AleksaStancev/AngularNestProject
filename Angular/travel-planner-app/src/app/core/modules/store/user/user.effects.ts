import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MaterialComponentsConfigProviderService } from 'src/app/core/services/material-components-config-provider/material-components-config-provider.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import * as UserActions from './user.actions';
import * as TripActions from '../trip/trip.actions';

@Injectable()
export class UserEffect {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
    private materialComponentsConfigProvider: MaterialComponentsConfigProviderService,
    private dialog: MatDialog,
    private actions$: Actions
  ) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap((user) =>
        this.authService
          .login(user)
          .pipe(mergeMap(() => [UserActions.loginSuccess()]))
      )
    )
  );

  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      mergeMap(() =>
        this.authService
          .logout()
          .pipe(mergeMap(() => [UserActions.logoutSuccess()]))
      )
    )
  );

  updateAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateAccount),
      mergeMap((user) =>
        this.userService
          .updateUser(user)
          .pipe(mergeMap(() => [UserActions.updateAccountSuccess()]))
      )
    )
  );

  updateSuccessEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateAccountSuccess),
        tap(() => {
          this.snackbar.open(
            'Update successful!',
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

  loginSuccesEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap(() => this.router.navigate(['/trips']))
      ),
    { dispatch: false }
  );

  logoutSuccessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logoutSuccess),
      tap(() => this.router.navigate(['/users'])),
      mergeMap(() => [TripActions.tripDeselect()])
    )
  );

  deleteAccountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteAccount),
      mergeMap(() =>
        this.userService.deleteUser().pipe(
          tap(() => {
            this.snackbar.open(
              'Account deleted!',
              undefined,
              this.materialComponentsConfigProvider.snackbarConfig([
                'mat-toolbar',
                'mat-warn',
              ])
            );
            this.dialog.closeAll();
          }),
          mergeMap(() => [UserActions.logoutSuccess()])
        )
      )
    )
  );

  registerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      mergeMap((user) =>
        this.userService
          .registerUser(user)
          .pipe(mergeMap(() => [UserActions.login(user)]))
      )
    )
  );
}
