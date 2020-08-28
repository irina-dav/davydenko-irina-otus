import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Observable, Subscription} from 'rxjs';
import {Translation} from '../shared/interfaces';
import {ViewService} from '../shared/view.service';
import {VocabularyService} from '../shared/vocabulary.service';

@Component({
  selector: 'app-recent-page',
  templateUrl: './recent-page.component.html',
  styleUrls: ['./recent-page.component.scss']
})
export class RecentPageComponent implements OnInit, OnDestroy {

  recentWords$: Observable<Translation[]>;
  subChangeVocabulary: Subscription;

  constructor(private vocabularyService: VocabularyService,
              private toastService: ToastrService,
              private viewService: ViewService) {
  }

  ngOnInit(): void {
    this.subChangeVocabulary = this.vocabularyService.emitChangeVocabulary.subscribe(data => {
      this.recentWords$ = this.vocabularyService.getTranslationsAll();
    });
  }

  ngOnDestroy(): void {
    if (this.subChangeVocabulary) {
      this.subChangeVocabulary.unsubscribe();
    }
  }

  deleteWord(translation: Translation): void {
    this.vocabularyService.deleteTranslation(translation).subscribe(
      resp => this.viewService.notifyFromVocabulary(resp),
      error => this.toastService.error(error.error.message));
  }
}
