import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: any;
  @Input() data: any;
  @Input() viewAction: boolean = false;

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.columns);
  }
}
