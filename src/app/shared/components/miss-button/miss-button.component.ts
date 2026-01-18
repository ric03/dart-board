import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {CurrentPlayerService} from '../../../services/current-player.service';
import {DartService} from '../../../services/dart.service';
import {CricketService} from '../../../services/cricket.service';
import {customRipple} from '../../util';
import {ShapeMorphDirective} from '../../directive/shape-morph.directive';

@Component({
    selector: 'app-miss-button',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatRippleModule, ShapeMorphDirective],
    templateUrl: './miss-button.component.html',
    styleUrls: ['./miss-button.component.scss']
})
export class MissButtonComponent {
    private currentPlayerService = inject(CurrentPlayerService);
    private dartService = inject(DartService);
    private cricketService = inject(CricketService);

    protected readonly customRipple = customRipple;

    scoreMiss() {
        if (this.currentPlayerService.currentGameMode === 'Cricket') {
            this.cricketService.scoreCricketWithMultiplier({value: 0, multiplier: 1});
        } else {
            this.dartService.score({value: 0, multiplier: 1});
        }
    }
}
