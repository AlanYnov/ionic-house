import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { FirstComponent } from '../components/info/first/first.component';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  componentState = 'btnLight'

  btnTemperatureHumidity = false;
  btnDoorWindow = false;
  btnLight = true;
  btnAirConditioning = false;

  constructor(public authService: AuthService,
    public modalCtrl: ModalController) {}

    ngOnInit(): void {
      this.openModal()
    }

  toggleBtn(button: string){
    this.btnTemperatureHumidity = button === 'btnTemperatureHumidity';
    this.btnDoorWindow = button === 'btnDoorWindow';
    this.btnLight = button === 'btnLight';
    this.btnAirConditioning = button === 'btnAirConditioning';
    this.componentState = button;
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: FirstComponent,
    });

    await modal.present();
  }

}
