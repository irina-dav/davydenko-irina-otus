import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {map, take, takeWhile} from 'rxjs/operators';
import {Translation} from '../shared/interfaces';
import {VocabularyService} from '../shared/vocabulary.service';

@Component({
  selector: 'app-training-page',
  templateUrl: './training-page.component.html',
  styleUrls: ['./training-page.component.scss']
})
export class TrainingPageComponent implements OnInit, OnDestroy {

  trainWords: Translation[];
  checkWord = '';
  checkResult: boolean | undefined = undefined;
  order = 0;
  successCount = 0;
  isTraining = false;
  subTimer$ = new Subscription();
  leftTimeMs: number;
  leftTimePercentage: number;
  durationMin = 5;
  durationMs: number = this.durationMin * 60 * 1000;
  sub: Subscription;

  constructor(private vocabularyService: VocabularyService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.finishTimer();
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  startTimer(): void {
    this.subTimer$ = timer(0, 1000).pipe(
      take(this.leftTimeMs),
      map(() => this.leftTimeMs -= 1000),
      takeWhile(t => t > 0, true)
    ).subscribe((v) => this.leftTimePercentage = 100 * (v / this.durationMs));
  }

  finishTimer(): void {
    if (this.subTimer$) {
      this.subTimer$.unsubscribe();
    }
  }

  startTrain(): void {
    this.isTraining = true;
    this.order = 1;
    this.sub = this.vocabularyService.getTranslationsAll()
      .subscribe(data => this.trainWords = data);
    this.leftTimeMs = this.durationMs;
    this.leftTimePercentage = 100;
    this.startTimer();
  }

  finishTrain(): void {
    this.isTraining = false;
    this.finishTimer();
  }

  prevWord(): void {
    this.order--;
    this.checkResult = undefined;
    this.checkWord = '';
  }

  nextWord(): void {
    this.order++;
    this.checkResult = undefined;
    this.checkWord = '';
  }

  checkTranslation(): void {
    const currWord = this.trainWords[this.order - 1];
    this.checkResult = (currWord.targetText === this.checkWord);
    if (this.checkResult) {
      this.successCount++;
    }
  }
}
