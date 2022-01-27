import { Component, OnInit } from '@angular/core';
import { DartCounterService } from 'src/app/services/dart-counter.service';

@Component({
  selector: 'app-input-button-row',
  templateUrl: './input-button-row.component.html',
  styleUrls: ['./input-button-row.component.scss'],
})
export class InputButtonRowComponent implements OnInit {

  arrayOf20 =  Array(20)
  constructor(private dartCounterService: DartCounterService) { }

  ngOnInit(): void {
  }

  public clicky(points: number) {
    this.dartCounterService.reduceCountBy(points);
  }

}
