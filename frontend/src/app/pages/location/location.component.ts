import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from 'src/app/components/location-card/location-card.component';
import { Location } from 'src/app/components/location-card/location-card.component';
import { GoogleMapsModule } from '@angular/google-maps';

const DUMMY_LOCATIONS = [
  {
    id: 1,
    name: 'Konjički klub "Smet"',
    address: 'Smetovi bb',
    type: 'Zooloski vrt',
    image: '/assets/images/smet.jpg',
  },
  {
    id: 2,
    name: 'Restoran "960"',
    address: 'Smetovi bb',
    type: 'Restoran',
    image:
      '/assets/images/restoran_960.jpg',
  },
];

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [LocationCardComponent, CommonModule, GoogleMapsModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})



export class LocationComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral = {
    lat: 44.241962,
    lng: 17.969424
  };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    draggable: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 16,
  }
  locations: Location[] = DUMMY_LOCATIONS;

  ngOnInit() {}
 
  zoomIn() {
    if (this.zoom < 15) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > 8) this.zoom--;
  }
}
