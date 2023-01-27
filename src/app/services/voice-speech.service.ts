import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HouseService } from './house.service';
import { UtilsService } from './utils.service';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceSpeechService {

  public name: string = 'monsieur';

  recognition = new webkitSpeechRecognition();

  constructor(
    private loadingCtrl: LoadingController,
    public houseService: HouseService,
    public utils: UtilsService
  ) { }

  init() {

    let final_transcript = "";

    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = async (event: any) => {
      let interim_transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
          this.recognition.stop();
          console.log(final_transcript);
          this.response(final_transcript)
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      final_transcript = "";
    };
  }

  start() {
    this.recognition.start();
    console.log("Speech recognition started")
  }

  response(order: any) {
    if (order.includes("porte")) {
      this.doorIA(order);
    } else if (order.includes("fenêtre")){
      this.windowIA(order);
    }
    else if (order.includes("température") && (order.includes("humidité"))) {
      let read = new SpeechSynthesisUtterance(`Merci de me donner un seul ordre à la fois, ${this.name}`);
      speechSynthesis.speak(read);
    }
    else if (order.includes("ventilation")) {
      this.ventilationIA(order);
    } else if (order.includes("température")) {
      this.temperatureIA(order);
    } else if (order.includes("humidité")) {
      this.humidityIA(order);
    }
    else {
      this.talkToIA(order);
    }
  }

  async doorIA(order: any) {
    const loading = await this.loadingCtrl.create({message: "J'exécute vos ordres ..."});
    loading.present()
    if(order.includes("ouvr") && !this.houseService.door) {
      this.houseService.doorController().subscribe({
        error: () => {
          loading.dismiss();
          let read = new SpeechSynthesisUtterance("Il semble qu'un problème soit survenu, ${this.name}");
          speechSynthesis.speak(read);
          this.utils.showToast("Il semble qu'un problème soit survenu", 'danger')
        },
        complete: () => {
          loading.dismiss();
          this.houseService.refreshDoor();
          let read = new SpeechSynthesisUtterance(`Porte ouverte, ${this.name}`);
          speechSynthesis.speak(read);
          this.utils.showToast(`Porte ouverte`, 'dark')
        }
      })
    } else if (order.includes("ferm") && this.houseService.door){
      this.houseService.doorController().subscribe({
        error: () => {
          loading.dismiss();
          let read = new SpeechSynthesisUtterance("Il semble qu'un problème soit survenu, ${this.name}");
          speechSynthesis.speak(read);
          this.utils.showToast("Il semble qu'un problème soit survenu", 'danger')
        },
        complete: () => {
          loading.dismiss();
          this.houseService.refreshDoor();
          let read = new SpeechSynthesisUtterance(`Porte fermée, ${this.name}`);
          speechSynthesis.speak(read);
          this.utils.showToast(`Porte fermée`, 'dark')
        }
      })
    } else if ((order.includes('ouvr') && this.houseService.door) || (order.includes('ferm') && !this.houseService.door)) {
      let read = new SpeechSynthesisUtterance(`Il semble que la porte soit déjà ${this.houseService.doorState}, ${this.name}`);
      speechSynthesis.speak(read);
      this.utils.showToast(`Porte déjà ${this.houseService.doorState}`, 'dark')
    }else {
      this.errorTalk();
    }
  }

  async windowIA(order: any){
    const loading = await this.loadingCtrl.create({message: "J'exécute vos ordres ..."});
    loading.present()
    if(order.includes("ouvr") && !this.houseService.window) {
      this.houseService.windowController().subscribe({
        error: () => {
          loading.dismiss();
          let read = new SpeechSynthesisUtterance("Il semble qu'un problème soit survenu, ${this.name}");
          speechSynthesis.speak(read);
          this.utils.showToast("Il semble qu'un problème soit survenu", 'danger')
        },
        complete: () => {
          loading.dismiss();
          this.houseService.refreshWindow();
          let read = new SpeechSynthesisUtterance(`fenêtre ${this.houseService.windowState}, ${this.name}`);
          speechSynthesis.speak(read);
          this.utils.showToast(`fenêtre ${this.houseService.windowState}`, 'dark')
        }
      })
    } else if (order.includes("ferm") && this.houseService.window){
      this.houseService.windowController().subscribe({
        error: () => {
          loading.dismiss();
          let read = new SpeechSynthesisUtterance("Il semble qu'un problème soit survenu, ${this.name}");
          speechSynthesis.speak(read);
          this.utils.showToast("Il semble qu'un problème soit survenu", 'danger')
        },
        complete: () => {
          loading.dismiss();
          this.houseService.refreshWindow();
          let read = new SpeechSynthesisUtterance(`fenêtre ${this.houseService.windowState}, ${this.name}`);
          speechSynthesis.speak(read);
          this.utils.showToast(`fenêtre ${this.houseService.windowState}`, 'dark')
        }
      })
    } else if ((order.includes('ouvr') && this.houseService.window) || (order.includes('ferm') && !this.houseService.window)) {
      let read = new SpeechSynthesisUtterance(`Il semble que la fenêtre soit déjà ${this.houseService.windowState}, ${this.name}`);
      speechSynthesis.speak(read);
      this.utils.showToast(`fenêtre déjà ${this.houseService.windowState}`, 'dark')
    }else {
      this.errorTalk();
    }
  }

  async ventilationIA(order: any) {
    const loading = await this.loadingCtrl.create({ message: "J'exécute vos ordres ..." });
    loading.present()
    this.houseService.checkVentilation().subscribe({
      next: (data: any) => {
        console.log(data)
        if (data.res == "fan.on") {
          if (order.includes("arrêt")) {
            this.houseService.stopVentilation().subscribe({
              next: () => {
                let read = new SpeechSynthesisUtterance("J'arrête la ventilation");
                speechSynthesis.speak(read);
              }
            })
          }
        } else if (data.res == "fan.off") {
          if (order.includes("faible")) {
            this.houseService.startVentilation(50).subscribe({
              next: () => {
                let read = new SpeechSynthesisUtterance("Ventilation en mode faible ${this.name}");
                speechSynthesis.speak(read);
              }
            })
          } else if (order.includes("médium")) {
            this.houseService.startVentilation(100).subscribe({
              next: () => {
                let read = new SpeechSynthesisUtterance("Ventilation en mode medium ${this.name}");
                speechSynthesis.speak(read);
              }
            })
          } else if (order.includes("max")) {
            this.houseService.startVentilation(200).subscribe({
              next: () => {
                let read = new SpeechSynthesisUtterance("Ventilation au maximum ${this.name}");
                speechSynthesis.speak(read);
              }
            })
          } else {
            let read = new SpeechSynthesisUtterance("Je n'ai pas compris votre demande");
            speechSynthesis.speak(read);
          }
        }
      }, error: () => {
        let read = new SpeechSynthesisUtterance("Je n'arrive pas à me connecter à la maison");
        speechSynthesis.speak(read);
        loading.dismiss()
      }, complete: () => { loading.dismiss() }
    })
  }

  temperatureIA(order: any) {
    let number;
    var matches = order.match(/(\d+)/);
    if (matches) {
      number = matches[0];
    }
    if (order.includes("moins")) {
      this.houseService.temperature = -parseInt(number);
      let read = new SpeechSynthesisUtterance(`Température passée à moins ${number} degrés, ${this.name}`);
      speechSynthesis.speak(read);
    } else {
      this.houseService.temperature = parseInt(number);
      let read = new SpeechSynthesisUtterance(`Température passée à ${number} degrés, ${this.name}`);
      speechSynthesis.speak(read);
    }

  }

  async humidityIA(order: any) {
    let number;
    var matches = order.match(/(\d+)/);
    if (matches) {
      number = matches[0];
    }
    number = parseInt(number);
    if (number < 0 || number > 100 || order.includes("moins")) {
      let read = new SpeechSynthesisUtterance(`L'humidité doit être comprise entre 0 et 100 ${this.name}`);
      speechSynthesis.speak(read);
    } else if (number >= 0 && number <= 100) {
      this.houseService.humidity = number;
      let read = new SpeechSynthesisUtterance(`Humidité passée à ${number} pourcents, ${this.name}`);
      speechSynthesis.speak(read);
    }

  }

  async talkToIA(order: any) {
    if (order.includes("commande")) {
      if (order.includes("sushi")) {
        let read = new SpeechSynthesisUtterance("Je vous mets en ligne avec le magasin de sushi le plus proche");
        speechSynthesis.speak(read);
        window.open("tel:+33972213899", "_blank");
      } else if (order.includes("pizza")) {
        let read = new SpeechSynthesisUtterance("Je vous mets en ligne avec la pizzeria la plus proche");
        speechSynthesis.speak(read);
        window.open("tel:+33442202202", "_blank");
      } else {
        let read = new SpeechSynthesisUtterance("Désolé, je ne peux pas commander ceci");
        speechSynthesis.speak(read);
      }
    } else if (order.includes("quel") && (order.includes("heure"))) {
      let today = new Date();
      let read = new SpeechSynthesisUtterance(`Il est ${today.getHours()} heure ${today.getMinutes()} ${this.name}`);
      speechSynthesis.speak(read);
    } else if (order.includes("appel") && order.includes("police")) {
      let read = new SpeechSynthesisUtterance("Les services de police et la garde nationale sont en route, ${this.name}");
      speechSynthesis.speak(read);
      window.open("tel:18", "_blank");
    }
    else if (order.includes("prof") || order.includes("intervenant") && order.includes("note")) {
      let read = new SpeechSynthesisUtterance("Il devrait vous attribuer la note de 20 sur 20, ${this.name}");
      speechSynthesis.speak(read);
    } else if (order.includes("beau")){
      let read = new SpeechSynthesisUtterance("C'est vous ${this.name}");
      speechSynthesis.speak(read);
    } else if (order.includes("maître")){
      this.name = 'maître'
      let read = new SpeechSynthesisUtterance("Bien sûr, maître");
      speechSynthesis.speak(read);
    }
    else {
      let read = new SpeechSynthesisUtterance("Je n'ai pas compris votre demande");
      speechSynthesis.speak(read);
    }
  }

  errorTalk(){
    let read = new SpeechSynthesisUtterance("Je n'ai pas compris votre demande, ${this.name}");
    speechSynthesis.speak(read);
  }
}
