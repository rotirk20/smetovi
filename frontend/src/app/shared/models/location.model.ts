export interface WorkingHours {
  day: string;   // e.g., "Monday"
  open: string;  // e.g., "09:00"
  close: string; // e.g., "17:00"
}
export interface Location {
  id: number;
  name: string;
  description: string,
  address: string;
  type: string;
  image?: string;
  coordinates: google.maps.LatLngLiteral;
}

export interface LocationWithHours extends Location {
  workingHours?: WorkingHours[]; // Array of days and their hours
}
