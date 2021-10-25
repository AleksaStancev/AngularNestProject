import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { HttpGeneralService } from 'src/app/core/services/http-general/http-general.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss'],
})
export class CreateUserPageComponent implements OnInit {
  constructor() {}

  onCreateUser(formGroup: FormGroup): void {
    alert(formGroup.value);
  }
  ngOnInit(): void {}
}
