import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user : string = 'Alan';

  constructor() { }
}
