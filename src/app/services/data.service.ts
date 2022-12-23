import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DataService {
  private nameSource = new BehaviorSubject<string>('');
  private provider = new BehaviorSubject<string>('');
    // TODO: provider and message
  option = this.nameSource.asObservable()
  constructor() { }
  productColorOptionClickHandler(option: string, provider: string) {
    this.nameSource.next(option);
    this.provider.next(provider);

  }
}