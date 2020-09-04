import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {EVocabularyCodeResponse, IVocabularyResponse, Translation} from './interfaces';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VocabularyStorageService {

  constructor(private storage: LocalStorageService) {
  }

  static compareTranslations(a: Translation, b: Translation): boolean {
    return (a.targetText === b.targetText && a.sourceText === b.sourceText);
  }

  loadVocabulary(): Observable<Translation[]> {
    const vocabulary = this.storage.getItem('vocabulary');
    return of(vocabulary ? JSON.parse(vocabulary) : [] as Translation[]);
  }

  updateVocabulary(words: Translation[]): void {
    this.storage.setItem('vocabulary', JSON.stringify(words));
  }

  addTranslation(translation: Translation): Observable<IVocabularyResponse> {
    return this.loadVocabulary().pipe(map(data => {
      if (!data.find(t => VocabularyStorageService.compareTranslations(t, translation))) {
        data.push(translation);
        this.updateVocabulary(data);
        return {code: EVocabularyCodeResponse.AddedSuccessfully, translation};
      } else {
        return {code: EVocabularyCodeResponse.AlreadyExist, translation};
      }
    }));
  }

  deleteTranslation(translation: Translation): Observable<IVocabularyResponse> {
    return this.loadVocabulary().pipe(map(data => {
      const idx: number = data.findIndex(t => VocabularyStorageService.compareTranslations(t, translation));
      if (idx >= 0) {
        data.splice(idx, 1);
        this.updateVocabulary(data);
        return {code: EVocabularyCodeResponse.DeletedSuccessfully, translation};
      } else {
        return {code: EVocabularyCodeResponse.NotFound, translation};
      }
    }));
  }

}
