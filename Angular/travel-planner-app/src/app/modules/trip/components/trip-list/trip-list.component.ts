import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/core/modules/store/app.state';
import { tripSelect } from 'src/app/core/modules/store/trip/trip.actions';
import { SelectListComponent } from 'src/app/shared/components/select-list/select-list.component';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  @Input() listId: number = 0;
  @Input() title: string = '';
  @Input() trips: Observable<Trip[]> = of([]);
  @Output() tripSelectedEvent: EventEmitter<number> = new EventEmitter();
  @ViewChild('list') list!: SelectListComponent;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  resetSelection(selectedListId: number): void {
    if (selectedListId !== this.listId) this.list.clearSelect();
  }

  onSelect() {
    this.store.dispatch(tripSelect({ id: this.list.selectedOption.value.id }));
    this.tripSelectedEvent.emit(this.listId);
  }
}
