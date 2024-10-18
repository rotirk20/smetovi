import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidget implements OnInit {
  weatherData: any;
  weatherIcon: string = ''; // This will hold the FontAwesome icon name
  @Input() hasScrolled: boolean = false; // Track if the navbar has scrolled

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Start weather updates with a default interval of 15 minutes (can change dynamically)
    this.weatherService.startWeatherUpdates(15 * 60 * 1000);

    // Subscribe to the weather data observable
    this.weatherService.weather$.subscribe(data => {
      this.weatherData = data;
      this.setWeatherIcon(data?.weather[0].main);
    });
  }

  ngOnDestroy(): void {
    // Stop the weather updates when the component is destroyed
    this.weatherService.stopWeatherUpdates();
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
