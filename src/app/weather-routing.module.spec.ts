import { WeatherRoutingModule } from './weather-routing.module';

describe('WeatherRoutingModule', () => {
  let weatherRoutingModule: WeatherRoutingModule;

  beforeEach(() => {
    weatherRoutingModule = new WeatherRoutingModule();
  });

  it('should create an instance', () => {
    expect(weatherRoutingModule).toBeTruthy();
  });
});
