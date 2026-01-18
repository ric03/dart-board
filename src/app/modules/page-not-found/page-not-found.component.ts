import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found',
  template: `
    <div class="container text-center mt-lg-5">
      <h1><code>
        {{router.url}}<br>
        404 not found</code></h1>
    </div>
  `,
  styles: [],
  standalone: false,
})
export class PageNotFoundComponent {

  constructor(public router: Router) {
  }
}
