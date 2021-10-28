import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormInputTypesProviderService } from 'src/app/shared/services/form-input-types-provider/form-input-types-provider.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss'],
})
export class InProgressComponent implements OnInit {
  tripName: string = 'Trip name';
  inProgressForm!: FormGroup;
  tripActivitiesFormControl!: FormControl;
  @Input() tripToDisplay: Observable<Trip | null> = of();
  constructor(
    private formBuilder: FormBuilder,
    public formInputTypesProvider: FormInputTypesProviderService
  ) {}

  ngOnInit(): void {
    this.inProgressForm = this.formBuilder.group({
      tripActivites: [''],
      inProgressNotes: [''],
    });

    this.tripActivitiesFormControl = this.inProgressForm.controls[
      'tripActivities'
    ] as FormControl;

    this.tripToDisplay.subscribe((trip) => {
      //  this.inProgressForm.controls['inProgressNotes'].patchValue();
    });
  }
}
