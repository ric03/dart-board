import { Component, OnInit } from '@angular/core';
import { DartCounterService } from 'src/app/services/dart-counter.service';

@Component({
  selector: 'app-input-button-row',
  templateUrl: './input-button-row.component.html',
  styleUrls: ['./input-button-row.component.scss'],
})
export class InputButtonRowComponent implements OnInit {

  arrayOf10 =  Array(10);
  constructor(private dartCounterService: DartCounterService) { }

  ngOnInit(): void {
  }

  public reduceSingle(points: number) {
    this.dartCounterService.reduceCountBy(points);
  }

  public reduceDouble(points: number) {
    this.dartCounterService.reduceCountBy(points*2);
  }

  public reduceTriple(points: number) {
    this.dartCounterService.reduceCountBy(points*3);
  }

}
