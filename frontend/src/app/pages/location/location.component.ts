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
    image: 'https://images.pexels.com/photos/808465/pexels-photo-808465.jpeg',
  },
  {
    id: 2,
    name: 'Restoran Smetovi',
    address: 'Smetovi bb',
    type: 'Restoran',
    image:
      'https://images.pexels.com/photos/552785/pexels-photo-552785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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
