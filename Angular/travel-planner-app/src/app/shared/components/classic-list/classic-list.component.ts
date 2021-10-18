import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { VirtualScrollComponent } from '../virtual-scroll/virtual-scroll.component';

@Component({
  selector: 'app-classic-list',
  templateUrl: './classic-list.component.html',
  styleUrls: ['./classic-list.component.scss'],
})
export class ClassicListComponent
  extends VirtualScrollComponent
  implements OnInit
{
  @Input() items: any[] = [];
  @Input() listItemTemplate!: TemplateRef<any>;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
