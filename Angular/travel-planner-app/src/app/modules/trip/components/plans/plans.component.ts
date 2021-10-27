import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidationErrorMessageProviderService } from 'src/app/core/services/validation-error-messages-provider/validation-error-message-provider.service';
import { FormInputTypesProviderService } from 'src/app/shared/services/form-input-types-provider/form-input-types-provider.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  plansForm!: FormGroup;
  neededDocumentsFormControl!: FormControl;
  packingListFormControl!: FormControl;
  tripActivitiesFormControl!: FormControl;
  transportListFormControl!: FormControl;
  tripName: string = 'Trip';
  constructor(
    private formBuilder: FormBuilder,
    public formInputTypesProvider: FormInputTypesProviderService,
    public validationErrorMessageProvider: ValidationErrorMessageProviderService
  ) {}

  ngOnInit(): void {
    this.plansForm = this.formBuilder.group({
      startDate: [{ value: '', disabled: true }, Validators.required],
      endDate: [{ value: '', disabled: true }, Validators.required],
      tripBudget: ['', [Validators.min(1), Validators.required]],
      planningNotes: [''],
      neededDocuments: [
        [
          {
            sectionName: 'sekcija',
            checklist: [
              { content: 'kontent', checked: true },
              { content: 'kontent1', checked: false },
              { content: 'kontent11', checked: true },
            ],
          },
          {
            sectionName: 'sekcija3',
            checklist: [{ content: 'kontent3', checked: true }],
          },
          {
            sectionName: 'sekcija',
            checklist: [{ content: 'kontent', checked: true }],
          },
        ],
      ],
      packingList: [[]],
      tripActivities: [[]],
      transportList: [[]],
    });

    this.neededDocumentsFormControl = this.plansForm.controls[
      'neededDocuments'
    ] as FormControl;

    this.packingListFormControl = this.plansForm.controls[
      'packingList'
    ] as FormControl;

    this.tripActivitiesFormControl = this.plansForm.controls[
      'tripActivities'
    ] as FormControl;

    this.transportListFormControl = this.plansForm.controls[
      'transportList'
    ] as FormControl;
  }
}
