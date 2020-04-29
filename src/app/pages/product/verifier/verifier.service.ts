import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hash } from '@enchainte/sdk';

@Injectable({
  providedIn: 'root'
})
export class VerifierService {

  public openedVerifier = new Subject<{open: boolean, x: number, y: number, date: Date, value: string, data: any, hash: Hash[]}>();
  public openedVerifierObserver = this.openedVerifier.asObservable();

  constructor() { }

  public openVerifier(x: number, y: number, date: Date, value: string, data: any, hash: Hash[]) {
    setTimeout(() => {
      this.openedVerifier.next({
        open: true,
        x,
        y,
        date,
        value,
        data,
        hash
      })
    }, 200)
  }
  
  public closeVerifier() {
    this.openedVerifier.next({
      open: false,
      x: null,
      y: null,
      date: null,
      value: null,
      data: null,
      hash: null
    })
  }

  public getOpenedObservable() {
    return this.openedVerifierObserver;
  }

}
