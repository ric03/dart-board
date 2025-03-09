import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CircketOverviewService {
  showPlayerDetails: boolean = false;


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
