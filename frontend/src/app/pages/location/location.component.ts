import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCardComponent } from 'src/app/components/location-card/location-card.component';
import { Location } from 'src/app/shared/models/location.model';
import { GoogleMapsModule, MapMarker, MapInfoWindow } from '@angular/google-maps';
import { InfoWindowContent } from 'src/app/shared/models/info-window.model';
import { Marker } from 'src/app/shared/models/marker.model';

const DUMMY_LOCATIONS: Location[] = [
  {
    id: 1,
    name: 'Konjički klub "Smet"',
    address: 'Smetovi bb',
    type: 'Zooloski vrt',
    image: '/assets/images/smet.jpg',
    coordinates: { lat: 44.241592, lng: 17.969323 },
  },
  {
    id: 2,
    name: 'Restoran "960"',
    address: 'Smetovi bb',
    type: 'Restoran',
    image: '/assets/images/restoran_960.jpg',
    coordinates: { lat: 44.242418, lng: 17.97361 },
  },
];

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [LocationCardComponent, CommonModule, GoogleMapsModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  @ViewChildren('markerRef') markerElements!: QueryList<MapMarker>;
  @ViewChild('googleMapContainer') googleMapContainer!: ElementRef;

  center: google.maps.LatLngLiteral = {
    lat: 44.241962,
    lng: 17.969424,
  };
  zoom = 12;
  markers: Marker[] = [];
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    draggable: false,
    fullscreenControl: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 16,
    styles: [
      {
        featureType: 'poi', // Hides points of interest
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit', // Hides transit stations
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'business', // Hides businesses
        stylers: [{ visibility: 'off' }],
      },
    ],
  };
  locations: Location[] = DUMMY_LOCATIONS;
  selectedLocationIndex!: number; // Tracks the selected location index
  infoWindowContent: InfoWindowContent = {
    name: '',
    image: ''
  };

  ngOnInit() {
    this.locations.forEach(location => {
      this.markers.push(
        {
          position: location.coordinates,
          title: location.name,
          image: location.image
        },
      )
    });
  }

  scrollToMap() {
    // Scroll to the Google Maps component
    if (window.innerWidth <= 768) {
      this.googleMapContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

   // Handle card click and open corresponding marker infoWindow
   openInfoWindowFromCard(index: number) {
    const markerRef = this.markerElements.get(index); // Get the marker reference by index
    if (markerRef) {
      this.center = this.markers[index].position; // Center map on the marker's position
      this.selectedLocationIndex = index; // Set the selected location index
      this.openInfoWindow(this.markers[index], markerRef, index);
    }
  }

  openInfoWindow(marker: Marker, markerRef: MapMarker, index: number) {
    this.infoWindowContent = { name: marker.title, image: marker.image };
    this.center = marker.position; // Center map on the marker's position
    this.selectedLocationIndex = index; // Set the selected location index
    this.infoWindow?.open(markerRef);
  }
  
  isLocationSelected(index: number): boolean {
    return this.selectedLocationIndex === index; // Check if current index is selected
  }

  getMarkerOptions(index: number): google.maps.MarkerOptions {
    return {
      position: this.markers[index].position,
      icon: (index === this.selectedLocationIndex) 
        ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' 
        : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      title: this.markers[index].title,
    };
  }
}
