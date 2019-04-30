import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CurrentweatherComponent } from './currentweather/currentweather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherService } from './service/weather.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// import { CustomErrorHandler } from './service/err-handler';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { ServerErrorsInterceptor } from './interceptor/http-error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CurrentweatherComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    WeatherRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
