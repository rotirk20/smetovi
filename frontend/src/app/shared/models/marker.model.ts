export interface Marker {
  position: google.maps.LatLngLiteral;
  title: string;
}

export interface Marker extends google.maps.MarkerOptions {
  image?: string; // Add custom field for image URL
}
