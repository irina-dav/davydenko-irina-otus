import {Injectable} from '@angular/core';
import {BehaviorSubject, concat, Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {IVocabularyResponse, Translation} from './interfaces';
import {TranslatorService} from './translator.service';
import {VocabularyStorageService} from './vocabulary-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {

  emitChangeVocabulary = new BehaviorSubject(this.storage.loadVocabulary());

  constructor(private storage: VocabularyStorageService,
              private translator: TranslatorService) {
  }

  addTranslation(translation: Translation): Observable<IVocabularyResponse> {
    return this.storage.addTranslation(translation).pipe(map(data => {
      this.emitChangeVocabulary.next(this.storage.loadVocabulary());
      return data;
    }));
  }

  deleteTranslation(translation: Translation): Observable<IVocabularyResponse> {
    return this.storage.deleteTranslation(translation).pipe(map(data => {
      this.emitChangeVocabulary.next(this.storage.loadVocabulary());
      return data;
    }));
  }

  translateWord(word: string): Observable<string> {
    const res = this.translator.translate(word, '');
    return res.pipe(map(r => {
      if (r.responseStatus !== 200) {
        console.log(r.responseStatus, r.responseDetails);
        throw throwError(r.responseDetails);
      }
      return r.responseData.translatedText;
    }));
  }

  translatePhrase(phrase: string): Observable<Translation[]> {
    const words: string[] = phrase.match(/[\w-]+/g);
    const arr = words.map(w => {
      const tr: Translation = {sourceText: w, targetText: ''};
      concat(this.translateWord(w)).subscribe(t => tr.targetText = t);
      return tr;
    });
    return of(arr);
  }

  getTranslationsAll(): Observable<Translation[]> {
    return this.storage.loadVocabulary();
  }

  getTranslations(n: number): Observable<Translation[]> {
    const arr: Translation[] = [];
    this.storage.loadVocabulary().subscribe(data => {
      const arrIndex = this.shuffle(Array.from(Array(Math.min(n, data.length)).keys()));
      arrIndex.map(idx => arr.push(data[idx]));
    });
    return of(arr);
  }

  private shuffle(arr: number[]): number[] {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

}
