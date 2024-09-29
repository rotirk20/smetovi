import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'f7b256b67b8cabbff6f83b5e91572bad'; 
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    const url = `${this.apiUrl}?lat=44.20&lon=17.90&appid=${this.apiKey}&units=metric`; // Use 'imperial' for Fahrenheit
    return this.http.get(url);
  }
}
