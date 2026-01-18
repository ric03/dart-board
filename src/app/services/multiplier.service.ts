import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiplierService {
  public multiplier = signal<number>(1);

  setMultiplier(m: number) {
    this.multiplier.set(m);
  }

  getMultiplier() {
    return this.multiplier();
  }

  reset() {
    this.multiplier.set(1);
  }
}
