import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() buttonOnClick: () => void = () => {};
  @Input() buttonDisabled: boolean = false;
  @Input() buttonText: string = '';
  @Input() buttonWidth: string = '100px';
  @Input() buttonHeight: string = 'fit-content';
  constructor() {}

  ngOnInit(): void {}
}
