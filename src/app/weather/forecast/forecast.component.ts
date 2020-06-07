import { Component, OnInit } from '@angular/core';
import { ForecastServiceService } from '../forecast-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  forecastData$: Observable<{ dateString: string; temp: number }[]>;
  constructor(private fcs: ForecastServiceService) {}

  ngOnInit(): void {
    // this.forecastData$ = this.fcs.getForecast();
  }
}
