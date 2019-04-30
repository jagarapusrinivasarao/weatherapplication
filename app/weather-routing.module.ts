import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CurrentweatherComponent } from './currentweather/currentweather.component';
import { ForecastComponent} from './forecast/forecast.component';

const WEATHER_ROUTER: Routes = [
  { path: '', component: CurrentweatherComponent},
  { path: 'currentweather', component: CurrentweatherComponent},
  { path: 'forecast', component: ForecastComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    // CommonModule
    RouterModule.forRoot(WEATHER_ROUTER)
  ],
  declarations: []
})
export class WeatherRoutingModule { }
