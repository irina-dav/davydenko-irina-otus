export interface Translation {
  sourceText: string;
  targetText: string;
}

interface IResponseData {
  translatedText: string;
}

export interface ITranslatorResponse {
  responseData: IResponseData;
  responseStatus: number;
  responseDetails: string;
}

export enum EVocabularyCodeResponse {
  AlreadyExist = 0,
  AddedSuccessfully = 1,
  DeletedSuccessfully = 2,
  NotFound = 3
}

export interface IVocabularyResponse {
  code: EVocabularyCodeResponse;
  translation: Translation;
}
