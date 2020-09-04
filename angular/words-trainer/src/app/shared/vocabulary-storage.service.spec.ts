import { TestBed } from '@angular/core/testing';

import { VocabularyStorageService } from './vocabulary-storage.service';

describe('VocabularyStorageService', () => {
  let service: VocabularyStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabularyStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
