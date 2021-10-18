import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent implements OnInit {
  @Input() formFormGroup!: FormGroup;
  @Input() title: string = '';
  @Input() tripFormContentTemplate!: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}
}
