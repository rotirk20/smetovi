import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidget } from './weather-widget.component';

describe('WeatherWidget', () => {
  let component: WeatherWidget;
  let fixture: ComponentFixture<WeatherWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
