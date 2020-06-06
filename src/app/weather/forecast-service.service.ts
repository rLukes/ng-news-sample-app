import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForecastServiceService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(private http: HttpClient) {}

  getcurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    });
  }

  getForecast() {
    return this.getcurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', 'metric')
          .set('appid', 'c3ffef06db176387cf7edb5d5ec1892f');
      }),
      switchMap((httpParams) => {
        return this.http.get(this.url, { params: httpParams });
      })
    );
  }
}
