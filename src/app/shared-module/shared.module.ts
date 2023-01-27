import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';

import { TemperatureHumidityComponent } from '../components/devices/temperature-humidity/temperature-humidity.component';
import { DoorsWindowsComponent } from '../components/devices/doors-windows/doors-windows.component';
import { LightsComponent } from '../components/devices/lights/lights.component';
import { AirConditioningComponent } from '../components/devices/air-conditioning/air-conditioning.component';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

import { FirstComponent } from '../components/info/first/first.component';
import { SecondComponent } from '../components/info/second/second.component';
import { ThirdComponent } from '../components/info/third/third.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [
      TemperatureHumidityComponent,
      DoorsWindowsComponent,
      LightsComponent,
      AirConditioningComponent,
      HeaderComponent,
      FooterComponent,
      FirstComponent,
      SecondComponent,
      ThirdComponent
  ],
  exports: [
    TemperatureHumidityComponent,
    DoorsWindowsComponent,
    LightsComponent,
    AirConditioningComponent,
    HeaderComponent,
    FooterComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent
  ]
})
export class SharedModule { }