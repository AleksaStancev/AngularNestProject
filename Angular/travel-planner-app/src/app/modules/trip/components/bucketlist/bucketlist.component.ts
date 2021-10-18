import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormInputTypesProviderService } from 'src/app/shared/services/form-input-types-provider/form-input-types-provider.service';

@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.scss'],
})
export class BucketlistComponent implements OnInit {
  bucketlistForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public formInputTypesProvider: FormInputTypesProviderService
  ) {}

  ngOnInit(): void {
    this.bucketlistForm = this.formBuilder.group({
      tripName: ['', [Validators.required, Validators.maxLength(50)]],
      destinationCountry: ['', [Validators.required]],
      destinationInCountry: ['', [Validators.required]],
      bucketlistNotes: [''],
    });
  }
}
