import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {
  onClick() {
    console.log('Link clicked!');
  }
}
