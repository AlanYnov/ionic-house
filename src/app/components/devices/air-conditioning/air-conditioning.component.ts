import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HouseService } from 'src/app/services/house.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-air-conditioning',
  templateUrl: './air-conditioning.component.html',
  styleUrls: ['./air-conditioning.component.scss'],
})
export class AirConditioningComponent implements OnInit {

  constructor(public houseService: HouseService,
    private utils: UtilsService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  async onIonChange(event: any){
    const loading = await this.loadingCtrl.create();
    loading.present()
    this.houseService.startVentilation(event.target.value).subscribe({
      next: () => {},
      error: () => {
        loading.dismiss();
        this.utils.showToast('Il semble quun problème est survenu', 'danger')
      },
      complete: () => {
        loading.dismiss();
        this.houseService.refreshFan();
        this.utils.showToast(`Ventilation ${this.houseService.mode}`, 'dark')
      }
    })
  }
}
