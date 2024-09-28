import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  city: string = 'Zenica'; // Default city, you can make this dynamic

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather(this.city);
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        console.log(this.weatherData)
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
      },
      complete: () => {
        console.log('Weather data fetching complete');
      }
    });
  }
  
}
