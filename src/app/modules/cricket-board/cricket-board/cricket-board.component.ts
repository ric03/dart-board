import {Component, HostListener} from '@angular/core';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-cricket-component',
  templateUrl: './cricket-board.component.html',
  styleUrls: ['./cricket-board.component.scss']
})
export class CricketBoardComponent {
  private env = environment;

  // TODO extract into service and enable conditionally?
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    if (this.env.production) {
      event.preventDefault();
    }
  }

}
