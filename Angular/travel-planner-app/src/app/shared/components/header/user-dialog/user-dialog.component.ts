import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/modules/store/app.state';
import { updateAccount } from 'src/app/core/modules/store/user/user.actions';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { User } from 'src/app/modules/user/models/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private store: Store<AppState>,
    private utility: UtilityService
  ) {}

  ngOnInit(): void {}

  updateAccount(formGroup: FormGroup) {
    const formValue = formGroup.value;
    this.utility.removeNullEntriesFromObject(formValue);
    this.store.dispatch(updateAccount(formValue));
  }
}
