import {EventEmitter, Injectable} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {map, take, takeWhile} from 'rxjs/operators';
import {TrainingSettings, Translation} from '../shared/interfaces';
import {SettingsStorageService} from '../shared/settings-storage.service';
import {VocabularyService} from '../shared/vocabulary.service';

export enum TrainingStatus {
  Training = 0,
  Done = 1,
  Stopped= 2
}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private settings: TrainingSettings;
  private tasks: Translation[];

  private subVocabulary$: Subscription;
  private subTimer$: Subscription;

  status: TrainingStatus;
  order: number;
  tasksSuccess: Translation[];

  leftTimeMs: number;
  leftTimePercentage: number;

  TimeIsUp: EventEmitter<any> = new EventEmitter();
  DoneAll: EventEmitter<any> = new EventEmitter();

  constructor(private vocabularyService: VocabularyService,
              private settingsStorage: SettingsStorageService) {
  }

  get taskCount(): number {
    return this.tasks.length;
  }

  start(): void {
    this.settings = this.settingsStorage.loadTrainingSettings();
    this.order =  0;
    this.tasksSuccess = [];
    this.subVocabulary$ = this.vocabularyService.getTranslations(this.settings.wordsNumber)
      .subscribe(data => {
        this.tasks = data;
        this.status = TrainingStatus.Training;
        this.startTimer();
      });
  }

  stop(): void {
    this.status = TrainingStatus.Stopped;
    this.finish();
  }

  finish(): void {
    if (this.subVocabulary$) {
      this.subVocabulary$.unsubscribe();
    }
    if (this.subTimer$) {
      this.subTimer$.unsubscribe();
    }
  }

  prevWord(): Translation {
    this.order--;
    return this.tasks[this.order - 1];
  }

  nextWord(): Translation {
    this.order++;
    return this.tasks[this.order - 1];
  }

  getTask(): Translation {
    return this.tasks[this.order];
  }

  checkTranslation(wordToCheck: string): boolean {
    const currWord = this.tasks[this.order - 1];
    const checkResult = (currWord.targetText === wordToCheck);
    if (checkResult) {
      this.tasksSuccess.push(currWord);
      if (this.tasksSuccess.length === this.tasks.length) {
        this.DoneAll.emit();
        this.status = TrainingStatus.Done;
        this.finish();
      }
    }
    return checkResult;
  }

  getHint(): string {
    return this.tasks[this.order - 1].targetText;
  }

  startTimer(): void {
    const durationMs = this.settings.duration * 60 * 1000;
    this.leftTimeMs = durationMs;
    this.leftTimePercentage = 100;
    this.subTimer$ = timer(0, 1000).pipe(
      take(this.leftTimeMs),
      map(() => this.leftTimeMs -= 1000),
      takeWhile(t => t > 0, true)
    ).subscribe((v) => {
      if (v <= 0) {
        this.TimeIsUp.emit();
        this.status = TrainingStatus.Done;
      }
      this.leftTimePercentage = 100 * (v / durationMs);
    });
  }

}
