import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/modules/store/app.state';
import { login } from 'src/app/core/modules/store/user/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {}

  onLogin(formGroup: FormGroup) {
    this.store.dispatch(login(formGroup.value));
  }
}
