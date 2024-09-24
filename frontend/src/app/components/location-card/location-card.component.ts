import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Location {
  id: number;
  name: string;
  address: string;
  type: string;
  image?: string;
  coordinates: google.maps.LatLngLiteral
}

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
})
export class LocationCardComponent {
  @Input() location: Location = {} as Location;
  @Input() index: number | undefined;
  @Input() isSelected: boolean = false; // Receives the selected state from the parent
  @Output() locationSelected = new EventEmitter<number>(); // Emit event when card is clicked

  onSelectLocation() {
    this.locationSelected.emit(this.index); // Emit the event when the card is clicked
  }
}
