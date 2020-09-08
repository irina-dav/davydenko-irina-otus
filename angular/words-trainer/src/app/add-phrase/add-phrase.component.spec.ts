import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';

import {AddPhraseComponent} from './add-phrase.component';

describe('AddPhraseComponent', () => {
  let component: AddPhraseComponent;
  let fixture: ComponentFixture<AddPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPhraseComponent],
      imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot()],
      providers: [ToastrService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
