import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription, timer } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'f7b256b67b8cabbff6f83b5e91572bad'; 
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private weatherSubject = new BehaviorSubject<any>(null); // To hold and emit weather data
  weather$: Observable<any> = this.weatherSubject.asObservable(); // Observable for weather data
  private weatherSubscription: Subscription | null = null; // To store interval subscription

  constructor(private http: HttpClient) {}

  startWeatherUpdates(intervalTime: number): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe(); // Clear any existing interval
    }

    this.weatherSubscription = timer(0, intervalTime).pipe(
      switchMap(() => this.getWeather()), // Fetch weather data on each interval
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        return []; // Return empty on error to avoid breaking the stream
      })
    ).subscribe({
      next: (data) => {
        const processedData = this.processWeatherData(data); // Process and update weather data
        this.weatherSubject.next(processedData); // Emit the updated weather data
      },
      error: (err) => console.error('Error:', err),
    });
  }

  // Method to fetch weather data from OpenWeather API
  getWeather(): Observable<any> {
    const url = `${this.apiUrl}?lat=44.20&lon=17.90&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  // Process and format the weather data before emitting
  private processWeatherData(data: any): any {
    const rawTemperature = data.main.temp;
    const weatherCondition = data.weather[0].main; // e.g., 'Clear', 'Rain', 'Clouds'

    return {
      ...data,
      roundedTemp: Math.round(rawTemperature), // Rounded temperature
      condition: weatherCondition,
    };
  }


  stopWeatherUpdates(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

  // Method to dynamically update the interval for fetching weather
  updateWeatherInterval(minutes: number): void {
    const intervalTime = minutes * 60 * 1000; // Convert minutes to milliseconds
    this.startWeatherUpdates(intervalTime); // Restart weather updates with new interval
  }
}
