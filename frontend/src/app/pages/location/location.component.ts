import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from 'src/app/components/location-card/location-card.component';
import { Location } from 'src/app/components/location-card/location-card.component';

const DUMMY_LOCATIONS = [
  {
    id: 1,
    name: 'Konjicki klub "Smet"',
    address: 'Smetovi bb',
    type: 'Zooloski vrt',
    image: '/assets/images/smet.jpg',
  },
  {
    id: 2,
    name: 'Restoran Smetovi',
    address: 'Smetovi bb',
    type: 'Restoran',
    image:
      '/assets/images/restoran_360.jpg',
  },
];

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [LocationCardComponent, CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})



export class LocationComponent {
  locations: Location[] = DUMMY_LOCATIONS;
}
