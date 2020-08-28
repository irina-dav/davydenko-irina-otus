import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ITranslatorResponse} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(private http: HttpClient) {
  }

  translate(word: string, language: string): Observable<ITranslatorResponse> {
    return this.http.get<ITranslatorResponse>(`https://api.mymemory.translated.net/get?q=${word}!&langpair=en|ru`);
  }
}
