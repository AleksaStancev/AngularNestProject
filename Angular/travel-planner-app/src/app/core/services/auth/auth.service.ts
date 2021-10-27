import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/modules/user/models/user.model';
import { AppState } from '../../modules/store/app.state';
import { selectIsUserLoggedIn } from '../../modules/store/user/user.selectors';
import { HttpGeneralService } from '../http-general/http-general.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpGeneral: HttpGeneralService,
    private store: Store<AppState>
  ) {}

  isLoggedIn(): Observable<boolean> {
    return this.store
      .select(selectIsUserLoggedIn)
      .pipe(
        mergeMap((storeIsLoggedIn: boolean) =>
          storeIsLoggedIn
            ? of(storeIsLoggedIn)
            : this.httpGeneral.get<boolean>('/auth/isloggedin')
        )
      );
  }

  login(user: User): Observable<User> {
    return this.httpGeneral.post<User>('/auth/login', user);
  }

  logout() {
    return this.httpGeneral.get<void>('/auth/logout');
  }
}
