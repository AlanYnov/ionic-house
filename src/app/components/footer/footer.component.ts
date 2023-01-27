import { Component, OnInit } from '@angular/core';
import { VoiceSpeechService } from 'src/app/services/voice-speech.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    public voiceSpeechService: VoiceSpeechService
  ) { }

  ngOnInit() {
    this.voiceSpeechService.init();
  }

  startService(){
    this.voiceSpeechService.start()
  }

}
