import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HouseService } from 'src/app/services/house.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./lights.component.scss'],
})
export class LightsComponent implements OnInit {

  constructor(public houseService: HouseService,
    private utils: UtilsService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {}

  async switchOutdoorLight(e: any){
    const loading = await this.loadingCtrl.create();
    loading.present()
    this.houseService.outdoorLightController().subscribe({
      next: () => {
      }, error: () => {
        e.target.checked = this.houseService.outdoorLight;
        loading.dismiss();
        this.utils.showToast("Il semble qu'un problème soit survenu", 'danger')
      }, complete: () => {
        this.houseService.refreshOutdoorLight();
        e.target.checked = this.houseService.outdoorLight;
        this.utils.showToast(`Lumière ${this.houseService.outdoorLightState}`, 'dark')
        loading.dismiss();
      }
    })
  }

  onChangeBrightness(event: any){
    if(event.target.value == 0){
      this.houseService.outdoorLight = false;
    } else {
      this.houseService.outdoorLight = true;
    }
    this.houseService.brightness = event.target.value;
  }

}
