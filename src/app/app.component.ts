import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dart-board';

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: any) {
      event.preventDefault();
  }

  @HostListener('window:onload', ['$event'])
  public onload(event: any) {
      event.preventDefault();
  }
}
