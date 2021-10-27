import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/core/modules/store/app.state';
import { register } from 'src/app/core/modules/store/user/user.actions';
import { HttpGeneralService } from 'src/app/core/services/http-general/http-general.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss'],
})
export class CreateUserPageComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  onCreateUser(formGroup: FormGroup): void {
    this.store.dispatch(register(formGroup.value));
  }
  ngOnInit(): void {}
}
