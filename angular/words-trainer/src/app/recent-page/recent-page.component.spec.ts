import {HttpClientTestingModule} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {AddPhraseComponent} from '../add-phrase/add-phrase.component';
import {AddWordComponent} from '../add-word/add-word.component';

import { RecentPageComponent } from './recent-page.component';

describe('RecentPageComponent', () => {
  let component: RecentPageComponent;
  let fixture: ComponentFixture<RecentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecentPageComponent, AddWordComponent, AddPhraseComponent],
      imports: [HttpClientTestingModule, FormsModule, ToastrModule.forRoot()],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
