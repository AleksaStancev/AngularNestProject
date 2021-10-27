import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../../modules/store/app.state';
import { logoutSuccess } from '../../modules/store/user/user.actions';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const userLoggedIn$: Observable<boolean> = this.authService
      .isLoggedIn()
      .pipe(
        tap((userLoggedIn) => {
          if (!userLoggedIn) this.store.dispatch(logoutSuccess());
        })
      );

    return userLoggedIn$;
  }
}
