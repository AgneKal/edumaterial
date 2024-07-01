import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  public errorEmitter = new EventEmitter<String>();
  constructor() { }
}
