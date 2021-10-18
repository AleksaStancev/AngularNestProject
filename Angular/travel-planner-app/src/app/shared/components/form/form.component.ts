import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCardComponent } from '../mat-card/mat-card.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends MatCardComponent {
  @Input() formFormGroup!: FormGroup;

  ngOnInit(): void {}
}
