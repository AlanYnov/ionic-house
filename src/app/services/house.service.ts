import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  public outdoorLight: boolean = false;
  public brightness: number = 50;
  public outdoorLightState !: string;

  public door: boolean = true;
  public doorState !: string;

  public window: boolean = true;
  public windowState !: string;

  public fan: boolean = false;
  public speed: number = 0;
  public mode !: string;

  public temperature: number = 26;
  public humidity: number = 43;

  public alarm: boolean = false;

  constructor(private http: HttpClient,
    private utils: UtilsService) { }

  // public url = 'http://192.168.163.250';
  public url = 'http://192.168.11.250';

  //Doors
  checkDoor() {
    return this.http.get(`${this.url}/door/check`)
  }

  doorController() {
    return this.http.get(`${this.url}/door`)
  }

  //Windows
  checkWindow() {
    return this.http.get(`${this.url}/window/check`)
  }

  windowController() {
    return this.http.get(`${this.url}/window`)
  }

  //Lights
  checkOutdoorLight() {
    return this.http.get(`${this.url}/led/check`)
  }

  outdoorLightController() {
    return this.http.get(`${this.url}/led`)
  }

  //Ventilation
  checkVentilation() {
    return this.http.get(`${this.url}/fan/check`)
  }

  startVentilation(speed: any) {
    if (speed === 1) { speed = 50; }
    else if (speed === 2) { speed = 100; }
    else if (speed === 3) { speed = 255; }
    else { speed = 0; }
    console.log(speed)
    return this.http.get(`${this.url}/fan?speed=${speed}`)
  }

  stopVentilation() {
    return this.http.get(`${this.url}/fan/off`)
  }

  //Temperature
  getTemperature() {
    return this.http.get(`${this.url}/temperature`)
  }

  //Humidity
  getHumidity() {
    return this.http.get(`${this.url}/`)
  }

  //Alarm

  checkAlarm() {
    return this.http.get(`${this.url}/alarm/check`)
  }

  stopAlarm() {
    return this.http.get(`${this.url}/alarm`)
  }

  refreshAll() {
    this.refreshDoor();
    this.refreshWindow();
    this.refreshOutdoorLight();
  }

  refreshDoor() {
    this.checkDoor().subscribe((data: any) => {
      console.log(data)
      if (data.res == "door.opened") {
        this.door = true;
        this.doorState = 'Ouverte';
      } else {
        this.door = false;
        this.doorState = 'Fermée';
      }
    })
  }

  refreshWindow() {
    this.checkWindow().subscribe((data: any) => {
      if (data.res == "window.opened") {
        this.window = true;
        this.windowState = 'Ouverte';
      } else {
        this.window = false;
        this.windowState = 'Fermée';
      }
    })
  }

  refreshOutdoorLight() {
    this.checkOutdoorLight().subscribe((data: any) => {
      if (data.res == "led.on") {
        this.outdoorLight = true;
        this.outdoorLightState = 'Allumée';
      } else {
        this.outdoorLight = false;
        this.outdoorLightState = 'Éteinte';
      }
    });
  }

  refreshFan() {
    if (this.speed == 1) {
      this.mode = 'Faible';
      this.fan = true;
    } else if (this.speed == 2) {
      this.mode = 'Medium';
      this.fan = true;
    } else if (this.speed == 3) {
      this.mode = 'Max';
      this.fan = true;
    } else {
      this.mode = 'Off';
      this.fan = false;
    }
  }

  refreshFan2() {
    this.checkVentilation().subscribe((data: any) => {
      if (data.res == "fan.on") {
        if (this.speed == 1) {
          this.mode = 'Faible';
          this.fan = true;
        } else if (this.speed == 2) {
          this.mode = 'Medium';
          this.fan = true;
        } else if (this.speed == 3) {
          this.mode = 'Max';
          this.fan = true;
        }
        this.fan = true;
      } else {
        this.fan = false;
      }
    })
  }

  refreshAlarm() {
    this.checkAlarm().subscribe((data: any) => {
      if (data.res == "alarm.activated") {
        this.alarm = true;
      } else {
        this.alarm = false;
      }
    })
  }

  refreshTemperature() {
    this.getTemperature().subscribe((data: any) => {
      this.temperature = data;
    })
  }

  refreshHumidity() {
    this.getHumidity().subscribe((data: any) => {
      this.humidity = data;
    })
  }

}
