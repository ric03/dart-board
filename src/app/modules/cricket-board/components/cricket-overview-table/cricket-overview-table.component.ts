import {Component} from '@angular/core';
import {PlayerService} from 'src/app/services/player.service';

@Component({
  selector: 'app-cricket-overview-table',
  templateUrl: './cricket-overview-table.component.html',
})
export class CricketOverviewTableComponent {
  showPlayerDetails: boolean = false;

  constructor(public playerService: PlayerService,
  ) {
  }

  showAllPlayerdetails() {
    this.showPlayerDetails = !this.showPlayerDetails;
    if (this.showPlayerDetails) {
      this.waitForElm('#playercard0').then((elm) => {
        // @ts-ignore
        elm.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
      });
    }

  }

  waitForElm(selector: string) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

}
