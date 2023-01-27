import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {

  public step :string = 'first';

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  change(step: string){
    this.step = step;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
