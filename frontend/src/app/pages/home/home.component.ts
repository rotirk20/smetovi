import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemListComponent } from 'src/app/components/location-list/item-list.component';
import { Location } from 'src/app/shared/models/location.model';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterLink, HttpClientModule, ItemListComponent]
})
export class HomeComponent implements OnInit {
  locations: Location[] = [];
  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe(data => {
      this.locations = data.locations; // Assuming 'locations' is the key in your JSON
    });
  }
}
