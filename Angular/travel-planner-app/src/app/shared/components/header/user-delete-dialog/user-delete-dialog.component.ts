import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/modules/store/app.state';
import { deleteAccount } from 'src/app/core/modules/store/user/user.actions';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.scss'],
})
export class UserDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserDeleteDialogComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  deleteAccount(): void {
    this.store.dispatch(deleteAccount());
  }
}
