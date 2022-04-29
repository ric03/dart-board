import {Injectable} from '@angular/core';
import {fromEvent} from "rxjs";
import {environment} from "../../environments/environment";

/**
 * Warn the user that he is redirecting, which may cause data loss
 * TODO save the state in the localstorage, which would make this service obsolete ;)
 */
@Injectable()
export class RedirectWarningService {

  private env = environment
  private unloadEvent = fromEvent(window, 'beforeunload')

  constructor() {
    this.unloadEvent.subscribe((event) => {
      if (this.env.isRedirectWarningActive) {
        event.preventDefault();
      }
    })
  }
}
