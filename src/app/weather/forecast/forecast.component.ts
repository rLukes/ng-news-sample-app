import { Component, OnInit } from '@angular/core';
import { ForecastServiceService } from '../forecast-service.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  constructor(private fcs: ForecastServiceService) {}

  ngOnInit(): void {
    this.fcs.getcurrentLocation().subscribe((posistion) => {
      console.log(posistion);
    });
  }
}
