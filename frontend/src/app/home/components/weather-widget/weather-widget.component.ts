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
    const basePath = 'https://openweathermap.org/img/wn/'; // Path to your PNG icons
    // Start weather updates with a default interval of 15 minutes (can change dynamically)
    this.weatherService.startWeatherUpdates(15 * 60 * 1000);

    // Subscribe to the weather data observable
    this.weatherService.weather$.subscribe(data => {
      this.weatherData = data;
      this.weatherIcon = basePath + data?.weather[0].icon + '.png';
    });
  }

  ngOnDestroy(): void {
    // Stop the weather updates when the component is destroyed
    this.weatherService.stopWeatherUpdates();
  }

}
