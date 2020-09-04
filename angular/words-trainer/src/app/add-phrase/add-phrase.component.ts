import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Translation} from '../shared/interfaces';
import {TranslatorService} from '../shared/translator.service';
import {ViewService} from '../shared/view.service';
import {VocabularyService} from '../shared/vocabulary.service';

@Component({
  selector: 'app-add-phrase',
  templateUrl: './add-phrase.component.html',
  styleUrls: ['./add-phrase.component.scss']
})
export class AddPhraseComponent implements OnInit, OnDestroy {

  phrase = '';
  sub: Subscription;
  wordsArr: Translation[] = [];

  constructor(private translatorService: TranslatorService,
              private vocabularyService: VocabularyService,
              private viewService: ViewService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  translate(): void {
    this.sub = this.vocabularyService.translatePhrase(this.phrase)
      .subscribe(data => this.wordsArr = data);
  }

  addIntoVocabulary(): void {
    this.wordsArr.map(tr => {
      const newTranslation: Translation = {sourceText: tr.sourceText, targetText: tr.targetText};
      this.sub = this.vocabularyService.addTranslation(newTranslation).subscribe(
        resp => this.viewService.notifyFromVocabulary(resp),
        error => this.viewService.notifyError(error));
    });
  }

  removeWord(sourceToDel: string): void {
    const idx = this.wordsArr.findIndex(t => t.sourceText === sourceToDel);
    this.wordsArr.splice(idx, 1);
  }

  close(): void {
    this.phrase = '';
    this.wordsArr.length = 0;
  }
}
