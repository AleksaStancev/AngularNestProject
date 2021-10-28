import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent implements OnInit {
  @Input() submitButtonText: string = 'Update';
  @Input() submitOnly: boolean = false;
  @Output() nextPhaseEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
