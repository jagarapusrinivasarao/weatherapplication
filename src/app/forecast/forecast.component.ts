import { Component, OnInit } from '@angular/core';
import { WeatherService} from '../service/weather.service';
import { Forecast } from '../models/forecast';
import { NgForm, FormGroup } from '@angular/forms';
import { CustomErrorHandler } from '../service/err-handler';



@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  myforecast: Forecast;
  constructor( private ws: WeatherService) { }
   forecastForm: FormGroup;
   cityForecast: Forecast[] = [];
   cityName: string;
   countryCode: string;
   futureDatesWeather: Map<string, Array<Forecast>>;
  ngOnInit() {
    console.log('in 5days forecast');
    this.forecastForm = new FormGroup({});
  }
  onSubmit(forecastForm: NgForm) {
    this.ws.forecastWeather(forecastForm.controls.City.value)
    .subscribe(res => {
      if (this.cityForecast) {
        this.cityForecast = new Array<Forecast>();
      }
      this.futureDatesWeather = new Map<string, Array<Forecast>>();
      // console.log(res);
      // console.log(res.list);
      this.cityName = res.city.name;
      this.countryCode = res.city.country;
      const fullWeather: Array<any> =  res.list;
      for (let index = 0; index < fullWeather.length; index++) {
        const foreCastOfDate =  new Array<Forecast>();
        const element = fullWeather[index];
        const temp = new Forecast(element.dt_txt, element.weather[0].icon, element.main.temp, element.main.temp_max, element.main.temp_min);
        this.cityForecast.push(temp);
        if (fullWeather[index - 1]) {
          const previousDateWeather = fullWeather[index - 1];
          const currentDate = new Date(element.dt_txt);
          const previousDate = new Date(previousDateWeather.dt_txt);
          console.log(currentDate.getDate(), previousDate.getDate(), currentDate.getDate() - previousDate.getDate());
          // console.log(previousDateWeather.dt, element.dt, previousDateWeather.dt === element.dt);
          // console.log(previousDateWeather.dt_txt, element.dt_txt, previousDateWeather.dt_txt === element.dt_txt);
          if (currentDate.getDate() === previousDate.getDate()) {
            foreCastOfDate.push(element);
            this.futureDatesWeather.set(currentDate.getDate().toString(), foreCastOfDate);
          } else {
            console.log(currentDate, previousDate);
            // foreCastOfDate.push(element);
          }
        }
      }
      this.futureDatesWeather.forEach((a, b) => console.log(a, b));
      // res.list.forEach(element => {
      // tslint:disable-next-line:max-line-length
      //   const temp = new Forecast(element.dt_txt, element.weather[0].icon, element.main.temp, element.main.temp_max, element.main.temp_min);
      //   this.cityForecast.push(temp);
        // if (this.futureDatesWeather.has(element.dt_txt)) {
        //   console.log(this.futureDatesWeather.get(element.dt_txt));
        // } else {
        //   const sameDateRecords = new Array<Forecast>();
        //   sameDateRecords.push(temp);
        //   this.futureDatesWeather.set(element.dt_txt, sameDateRecords)
        //   console.log(this.futureDatesWeather);
        // }
      // });
    });
    // this.ws.forecastWeather(forecastForm.controls.City.value).subscribe(
    //   res => {
    //     console.log(res);
    //     this.myforecast = res;
    //     for (int i = 0; i<res.list.length; i++ ) {
    //       const temporary = new Forecast(res.list[i].dt_txt,
    //                                       res.list[i].weather[0].icon,
    //                                        res.list[i].main.temp_max,
    //                                        res.list[i].main.temp_min);
    //       this.cityForecast.push(temporary);
    //     }
    //     console.log(this.cityForecast);
    //    });
}

}
