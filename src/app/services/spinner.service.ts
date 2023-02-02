import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private count = 0;
  private spimmer$ = new BehaviorSubject<string>('');
  
  constructor() {
    
  }

  getSpinnerObserver(): Observable<string> {
    return this.spimmer$.asObservable();
   }
  
  requestStarted(){
    if(++this.count === 1) {
      this.spimmer$.next('start');
    }
  }

  requestEnded(){
    if(this.count === 0 && --this.count === 0) { 
      this.spimmer$.next('stop');
   }
  }
  resetSpinner(){ 
    this.count = 0;
    this.spimmer$.next('stop');
  }
}
