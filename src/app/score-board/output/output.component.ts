import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DartCounterService } from 'src/app/services/dart-counter.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  public points$: Subject<number>;

  constructor(private dartCounterService: DartCounterService) { 
    this.points$ = this.dartCounterService.points$;
  }

  ngOnInit(): void { }

}
