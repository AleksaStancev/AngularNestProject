import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/modules/store/app.state';
import { addTrip } from 'src/app/core/modules/store/trip/trip.actions';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-new-trip-dialog',
  templateUrl: './new-trip-dialog.component.html',
  styleUrls: ['./new-trip-dialog.component.scss'],
})
export class NewTripDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewTripDialogComponent>,
    private utlility: UtilityService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  addTrip(formGroup: FormGroup): void {
    const formValue = formGroup.value;
    formValue.fetched = true;
    this.utlility.removeNullEntriesFromObject(formValue);
    this.store.dispatch(addTrip(formValue));
  }
}
