import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Translation} from '../shared/interfaces';
import {ViewService} from '../shared/view.service';
import {TrainingService, TrainingStatus} from './training.service';

@Component({
  selector: 'app-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.scss']
})
export class TrainingPageComponent implements OnInit, OnDestroy {

  currentTask: Translation;
  wordToCheck: string;
  resultOfChecking: boolean;
  subTraining: Subscription;

  constructor(public training: TrainingService,
              private view: ViewService) {
  }

  ngOnInit(): void {
    if (this.training.status === TrainingStatus.Training) {
      this.currentTask = this.training.getTask();
    }
    this.subTraining = this.training.TimeIsUp.subscribe(() =>
        this.view.notifyWarn('Training time is up :('));
    this.subTraining.add(this.training.DoneAll.subscribe(() =>
      this.view.notifySuccess('The training is completed successfully!')));
  }

  ngOnDestroy(): void {
    this.stopTrain();
    if (this.subTraining) {
      this.subTraining.unsubscribe();
    }
  }

  get isTraining(): boolean {
    return this.training.status === TrainingStatus.Training;
  }

  get isDone(): boolean {
    return this.training.status === TrainingStatus.Done;
  }

  get isCurrentChecked(): boolean {
    return this.training.tasksSuccess.includes(this.currentTask);
  }

  startTrain(): void {
    this.training.start();
    if (this.training.taskCount === 0) {
      this.view.notifyWarn('There are no words for training. Please, add new words to the vocabulary.');
      this.stopTrain();
    } else {
      this.nextWord();
    }
  }

  stopTrain(): void {
    this.training.stop();
  }

  checkTranslation(): void {
    this.resultOfChecking = this.training.checkTranslation(this.wordToCheck);
  }

  getHint(): void {
    this.wordToCheck = this.training.getHint();
    this.resultOfChecking = undefined;
  }

  prevWord(): void {
    this.clearCurrentAnswer();
    this.currentTask = this.training.prevWord();
  }

  nextWord(): void {
    this.clearCurrentAnswer();
    this.currentTask = this.training.nextWord();
  }

  clearCurrentAnswer(): void {
    this.wordToCheck = '';
    this.resultOfChecking = undefined;
  }

}
