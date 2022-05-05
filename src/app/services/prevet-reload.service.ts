import { HostListener, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrevetReloadService {

  private env = environment;

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: any) {
    if (this.env.production) {
      event.preventDefault();
    }
  }

  @HostListener('window:onload', ['$event'])
  public onload(event: any) {
    if (this.env.production) {
      event.preventDefault();
    }
  }
}
