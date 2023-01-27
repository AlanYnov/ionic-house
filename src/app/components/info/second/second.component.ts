import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss'],
})
export class SecondComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  changeStep(value: string) {
    this.newItemEvent.emit(value);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
