import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {EVocabularyCodeResponse, IVocabularyResponse} from './interfaces';
import {VocabularyService} from './vocabulary.service';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private vocabularyService: VocabularyService, private toastService: ToastrService) {
  }

  notifyError(error: any): void {
    this.toastService.error(error);
  }

  notifyFromVocabulary(resp: IVocabularyResponse): void {
    const description = `<b>${resp.translation.sourceText}-${resp.translation.targetText}</b>`;
    const opt = {enableHtml: true};
    if (resp.code === EVocabularyCodeResponse.AddedSuccessfully) {
      this.toastService.success(
        `The translation ${description} was successfully added to the vocabulary`, '', opt);
    } else if (resp.code === EVocabularyCodeResponse.AlreadyExist) {
      this.toastService.warning(
        `The translation ${description} already exist in the vocabulary`, '', opt);
    } else if (resp.code === EVocabularyCodeResponse.DeletedSuccessfully) {
      this.toastService.success(
        `The translation ${description} was successfully deleted from the vocabulary`, '', opt);
    } else if (resp.code === EVocabularyCodeResponse.NotFound) {
      this.toastService.warning(
        `The translation ${description} not found in the vocabulary`, '', opt);
    }
  }

}
