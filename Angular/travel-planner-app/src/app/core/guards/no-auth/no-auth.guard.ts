import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppState } from '../../modules/store/app.state';
import { loginSuccess } from '../../modules/store/user/user.actions';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanLoad {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const userNotLoggedIn$ = this.authService.isLoggedIn().pipe(
      tap((userLoggedIn) => {
        if (userLoggedIn) this.store.dispatch(loginSuccess());
      }),
      map((userLoggedIn: boolean) => !userLoggedIn)
    );

    return userNotLoggedIn$;
  }
}
