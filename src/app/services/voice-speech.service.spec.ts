import { TestBed } from '@angular/core/testing';

import { VoiceSpeechService } from './voice-speech.service';

describe('VoiceSpeechService', () => {
  let service: VoiceSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
