import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';

type ItemType = Location; // Union type for flexibility

@Component({
  selector: 'item-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  @Input() data!: ItemType[]; // decorate the property with @Input()
  @Input() title!: string;
  constructor() {}

}
