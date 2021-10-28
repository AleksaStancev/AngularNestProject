import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/modules/store/app.state';
import { deleteTrip } from 'src/app/core/modules/store/trip/trip.actions';
import { ButtonGroupComponent } from '../button-group/button-group.component';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent extends ButtonGroupComponent implements OnInit {
  @Input() formFormGroup!: FormGroup;
  @Input() title: string = '';
  @Input() tripFormContentTemplate!: TemplateRef<any>;
  @Output() onSubmitEvent: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<AppState>) {
    super();
  }

  deleteTrip() {
    this.store.dispatch(deleteTrip());
  }

  ngOnInit(): void {}
}
