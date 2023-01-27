import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';
import { VoiceSpeechService } from 'src/app/services/voice-speech.service';

@Component({
  selector: 'app-temperature-humidity',
  templateUrl: './temperature-humidity.component.html',
  styleUrls: ['./temperature-humidity.component.scss'],
})
export class TemperatureHumidityComponent implements OnInit {

  public temperature: number = this.houseService.temperature;
  public humidity: number = this.houseService.humidity;

  temperatureState!: string;
  humidityState!: string;

  config = {
    minTemp: -10,
    maxTemp: 50,
    unit: "Celcius"
  };

  constructor(
    public houseService: HouseService,
    public voiceSpeechService: VoiceSpeechService
  ) { }

  ngOnInit() {
    this.setTemperature(this.houseService.temperature);
    this.setStatus();
    setInterval(() => {
      this.temperature = this.houseService.temperature;
      this.setTemperature(this.houseService.temperature);
      this.setStatus();
      this.humidity = this.houseService.humidity;
    }, 2000);
    this.houseService.refreshTemperature();
  }

  // Change temperature

  setTemperature(degrees: number) {
    const temperature = document.getElementById("temperature");

    if (temperature) {
      temperature.style.height = (degrees - this.config.minTemp) / (this.config.maxTemp - this.config.minTemp) * 100 + "%";
      this.houseService.temperature = degrees;
      temperature.dataset['value'] = degrees + "°C";
    }

  }

  setStatus() {
    if (this.houseService.humidity < 20) {
      this.humidityState = 'Sécheresse';
    } else if (this.houseService.humidity > 70) {
      this.humidityState = 'Élevée';
    } else {
      this.humidityState = 'Normale';
    }

    if (this.houseService.temperature > 30) {
      this.temperatureState = 'Chaud';
    } else if (this.houseService.temperature < 15) {
      this.temperatureState = 'Froid';
    } else {
      this.temperatureState = 'Tempérée'
    }
  }



}
