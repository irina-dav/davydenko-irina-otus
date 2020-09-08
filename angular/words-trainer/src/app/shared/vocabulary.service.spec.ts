import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {VocabularyStorageService} from './vocabulary-storage.service';
import {VocabularyService} from './vocabulary.service';

describe('VocabularyService', () => {
  let service: VocabularyService;
  let storageService: VocabularyStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VocabularyService]
    });
    service = TestBed.inject(VocabularyService);
    storageService = TestBed.inject(VocabularyStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTranslationsAll returns observable array', (done) => {
    service.getTranslationsAll().subscribe((data) => {
      expect(data.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('translatePhrase calls translateWord once', (done) => {
    const appServiceSpy = spyOn(service, 'translateWord').and.returnValue(of());
    service.translatePhrase('one').subscribe((data) => {
      expect(appServiceSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('translatePhrase calls translateWord twice', (done) => {
    const spy = spyOn(service, 'translateWord').and.returnValue(of());
    service.translatePhrase('word1 word2').subscribe((data) => {
      expect(spy).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('vocabulary length increases by one after adding translation', (done) => {
    const tr = {sourceText: 'sourceText', targetText: 'targetText'};
    service.deleteTranslation(tr).subscribe(() => {
      service.getTranslationsAll().subscribe((dataBefore) => {
        const lenBefore = dataBefore.length;
        service.addTranslation(tr).subscribe(() => {
          service.getTranslationsAll().subscribe((dataAfter) => {
            const lenAfter = dataAfter.length;
            expect(lenAfter - lenBefore).toBe(1);
            done();
          });
        });
      });
    });
  });


});
