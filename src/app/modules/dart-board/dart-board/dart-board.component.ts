import { Component, HostListener } from '@angular/core';
import { environment } from "../../../../environments/environment";


@Component({
  selector: 'app-dart-board',
  templateUrl: './dart-board.component.html',
  styleUrls: ['./dart-board.component.scss',
  ]
})
export class DartBoardComponent {

  private env = environment;

  // TODO extract into service and enable conditionally?
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    if (this.env.production) {
      event.preventDefault();
    }
  }

}
