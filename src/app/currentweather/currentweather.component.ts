import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { CurrentWeather } from '../models/current-weather';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-currentweather',
  templateUrl: './currentweather.component.html',
  styleUrls: ['./currentweather.component.css']
})
export class CurrentweatherComponent implements OnInit {
   myWeather: CurrentWeather;
  constructor(private ws: WeatherService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      // console.log(position);
      this.ws.localWeather(position.coords.latitude, position.coords.longitude).subscribe(res => {
        this.myWeather = res;
      });
    });
   console.log('in component', this.myWeather);
  }
onSubmit(weatherForm: NgForm) {
     console.log(weatherForm);
     this.ws.anotherCityWeather(weatherForm.controls.City.value).subscribe(
       res => {
         this.myWeather = res;
        });
}
}
