import { Component, ElementRef, HostListener } from '@angular/core';
import { environment } from "../../../../environments/environment";


@Component({
  selector: 'app-dart-board',
  templateUrl: './dart-board.component.html',
  styleUrls: ['./dart-board.component.scss',
  ]
})
export class DartBoardComponent {

  constructor() {

  }
  private env = environment;

  // TODO extract into service and enable conditionally? --> keine Ahnung wie!
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    if (this.env.production) {
      event.preventDefault();
    }
  }
  @HostListener('window:onload', ['$event'])
  onload(event: any) {
    if (this.env.production) {
      event.preventDefault();
    }
  }
}
