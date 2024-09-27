export interface Location {
    id: number;
    name: string;
    address: string;
    type: string;
    image?: string;
    coordinates: google.maps.LatLngLiteral
  }