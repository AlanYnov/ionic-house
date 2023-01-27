import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-doors-windows',
  templateUrl: './doors-windows.component.html',
  styleUrls: ['./doors-windows.component.scss'],
})
export class DoorsWindowsComponent implements OnInit {

  constructor(public houseService: HouseService,
    private utils: UtilsService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.houseService.refreshDoor();
    this.houseService.refreshWindow();
  }

  async switchDoor(){
    const loading = await this.loadingCtrl.create();
    loading.present()
    this.houseService.doorController().subscribe({
      error: () => {
        loading.dismiss();
        this.utils.showToast('Il semble quun problème est survenu', 'danger')
      },
      complete: () => {
        loading.dismiss();
        this.houseService.refreshDoor();
        this.utils.showToast(`Porte ${this.houseService.doorState}`, 'dark')
      }
    })
  }

  async switchWindow(){
    const loading = await this.loadingCtrl.create();
    loading.present()
    this.houseService.windowController().subscribe({
      error: () => {
        loading.dismiss();
        this.utils.showToast("Il semble qu'un problème soit survenu", 'danger')
      },
      complete: () => {
        loading.dismiss();
        this.houseService.refreshWindow();
        this.utils.showToast(`Fenêtre ${this.houseService.doorState}`, 'dark')
      }
    })
  }

}
