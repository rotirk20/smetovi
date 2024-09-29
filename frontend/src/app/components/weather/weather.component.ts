import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  weatherIcon: string = ''; // This will hold the FontAwesome icon name
  @Input() hasScrolled: boolean = false; // Track if the navbar has scrolled

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        // Assuming temperature is in data.main.temp and is in Celsius
        const rawTemperature = data.main.temp;
        const weatherCondition = data.weather[0].main; // e.g., 'Clear', 'Rain', 'Clouds'

        this.weatherData = {
          ...data,
          roundedTemp: Math.round(rawTemperature), // Rounds to the nearest integer
          condition: weatherCondition, // Save the condition
        };
        this.setWeatherIcon(data.weather[0].main);
      },
      error: (err) => console.error(err),
    });
  }

  setWeatherIcon(condition: string) {
    // Set the icon path based on the weather condition
    const basePath = 'assets/images/weather/'; // Path to your PNG icons
    switch (condition) {
      case 'Clear':
        this.weatherIcon = `${basePath}sun.png`;
        break;
      case 'Clouds':
        this.weatherIcon = `${basePath}cloud.png`;
        break;
      case 'Rain':
        this.weatherIcon = `${basePath}cloud_rain.png`;
        break;
      case 'Snow':
        this.weatherIcon = `${basePath}snow.png`;
        break;
      default:
        this.weatherIcon = `${basePath}default.png`; // Default icon for unknown conditions
    }
    console.log(this.weatherIcon);
  }
}
