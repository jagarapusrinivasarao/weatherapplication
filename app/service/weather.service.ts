import { Injectable } from '@angular/core';
import { CurrentWeather } from '../models/current-weather';
import { Http } from '@angular/http';
import { Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Forecast } from '../models/forecast';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = 'https://api.openweathermap.org/data/2.5/weather';
  private app_id = 'cb6139499ede4748432834f42e33e8e4';
  private url_forecast = `https://api.openweathermap.org/data/2.5/forecast`;
  constructor( private http: Http) {
  }
  localWeather( lat: number, lon: number) {
    return this.http.get(`${this.url}?lat=${lat}&lon=${lon}&appid=${this.app_id}&units=metric`).pipe(
      map(res => res.json()),
      tap(console.log),
      map((parsed) => {
        return new CurrentWeather(parsed.name, parsed.main.temp,
           parsed.weather[0].icon, parsed.weather[0].description,
          parsed.main.temp_max, parsed.main.temp_min);
      })
    );
  }
  anotherCityWeather( city: string) {
     return this.http.get(`${this.url}?q=${city}&appid=${this.app_id}&units=metric`).pipe(
      map(res => res.json()),
      tap(console.log),
      map((parsed) => {
        return new CurrentWeather(parsed.name, parsed.main.temp,
           parsed.weather[0].icon, parsed.weather[0].description,
          parsed.main.temp_max, parsed.main.temp_min);
      })
    );
  }
  forecastWeather( city: string) {
    return this.http.get(`${this.url_forecast}?q=${city}&appid=${this.app_id}&units=metric`)
    .pipe(
      tap(e => console.log('in service', e)),
     map(res => res.json())
   );
 }
}
