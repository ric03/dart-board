import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-dart-board',
  templateUrl: './dart-board.component.html',
  styleUrls: ['./dart-board.component.scss',
]
})
export class DartBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
      event.preventDefault();

  }

}
