import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { FormInputTypesProviderService } from 'src/app/shared/services/form-input-types-provider/form-input-types-provider.service';
import { Trip } from '../../models/trip.model';
import { ButtonGroupComponent } from '../button-group/button-group.component';

@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.scss'],
})
export class BucketlistComponent
  extends ButtonGroupComponent
  implements OnInit
{
  bucketlistForm!: FormGroup;
  @Output() onSubmitEvent: EventEmitter<FormGroup> = new EventEmitter();
  @Input() tripToDisplay: Observable<Trip | null> = of();
  constructor(
    private formBuilder: FormBuilder,
    public formInputTypesProvider: FormInputTypesProviderService
  ) {
    super();
  }

  ngOnInit(): void {
    this.bucketlistForm = this.formBuilder.group({
      tripName: ['', [Validators.required, Validators.maxLength(50)]],
      destinationCountry: ['', [Validators.required]],
      destinationInCountry: ['', [Validators.required]],
      bucketlistNotes: [],
    });

    this.tripToDisplay.subscribe((trip) => {
      this.bucketlistForm.controls['tripName'].patchValue(trip?.tripName);
      this.bucketlistForm.controls['destinationCountry'].patchValue(
        trip?.destinationCountry
      );
      this.bucketlistForm.controls['destinationInCountry'].patchValue(
        trip?.destinationInCountry
      );
      this.bucketlistForm.controls['bucketlistNotes'].patchValue(
        trip?.bucketlistNotes
      );
    });
  }
}
