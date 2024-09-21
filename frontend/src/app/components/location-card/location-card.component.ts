import { Component, Input } from '@angular/core';

export interface Location {
  id: number;
  name: string;
  address: string;
  type: string;
  image?: string;
}

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [],
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent {
  @Input() location: Location = {} as Location;
}
