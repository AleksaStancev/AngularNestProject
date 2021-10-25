import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/user/models/user.model';
import { AppState } from '../../modules/store/app.state';
import { selectIsUserLoggedIn } from '../../modules/store/user/user.selectors';
import { HttpGeneralService } from '../http-general/http-general.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpGeneral: HttpGeneralService<User>,
    private store: Store<AppState>
  ) {}

  isLoggedIn(): boolean {
    let userLoggedIn: boolean = false;

    this.store
      .select(selectIsUserLoggedIn)
      .subscribe((loggedIn: boolean) => (userLoggedIn = loggedIn));

    return userLoggedIn;
  }

  login(user: User): Observable<User> {
    return this.httpGeneral.post('/auth/login', user);
  }

  logout() {
    return this.httpGeneral.get('/auth/logout');
  }
}
