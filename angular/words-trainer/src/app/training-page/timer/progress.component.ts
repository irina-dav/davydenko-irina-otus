import {Component} from '@angular/core';
import {TrainingService} from '../training.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  constructor(public trainingService: TrainingService) {
  }

}
