import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffect {
  constructor(
    private authService: AuthService,
    private router: Router,
    private actions$: Actions
  ) {}

  loginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap((credentials) =>
        this.authService
          .login({
            username: credentials.username,
            password: credentials.password,
          })
          .pipe(
            mergeMap(() => [UserActions.loginSuccess()]),
            tap(() => this.router.navigate(['/trips']))
          )
      )
    );
  });

  logoutEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          mergeMap(() => [UserActions.logoutSuccess()]),
          tap(() => this.router.navigate(['/users']))
        )
      )
    );
  });
}
