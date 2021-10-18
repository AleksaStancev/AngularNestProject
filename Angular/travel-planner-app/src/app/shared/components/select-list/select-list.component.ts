import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ClassicListComponent } from '../classic-list/classic-list.component';
import { VirtualScrollComponent } from '../virtual-scroll/virtual-scroll.component';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
})
export class SelectListComponent
  extends ClassicListComponent
  implements OnInit
{
  @Input() multupleSelect: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
