import { Injectable } from '@angular/core';
import { Observable, merge, of, throwError } from 'rxjs';
import {
  map,
  switchMap,
  pluck,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
  retry,
} from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResonse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class ForecastServiceService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(private http: HttpClient, private ns: NotificationsService) {}

  getcurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(1),
      tap((val) => {
        this.ns.addSuccess('location ok');
      }),
      catchError((error) => {
        // handle the error
        this.ns.addError('Failed to get location');
        // return a new observable
        return throwError(error);
      })
    );
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
        return this.http.get<OpenWeatherResonse>(this.url, {
          params: httpParams,
        });
      }),
      pluck('list'),
      mergeMap((value) => of(...value)),
      filter((value, index) => index % 8 === 0),
      map((val) => {
        return {
          dateString: val.dt_txt,
          temp: val.main.temp,
        };
      }),
      toArray(),
      share()
    );
  }
}
