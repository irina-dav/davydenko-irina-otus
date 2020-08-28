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

}
