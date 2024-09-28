import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private jsonUrl = 'assets/data/data.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any> {
    return this.http.get(this.jsonUrl);
  }
}
