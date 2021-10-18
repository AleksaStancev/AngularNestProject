import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  @Input() title: string = '';
  @Input() trips: string[] = ['Pera'];
  @Input() addItem: () => void = () => {};
  constructor() {}

  ngOnInit(): void {}
}
