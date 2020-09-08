import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
import {TrainingPageComponent} from './training-page.component';

describe('TrainingPageComponent', () => {
  let component: TrainingPageComponent;
  let fixture: ComponentFixture<TrainingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPageComponent, ConfirmDialogComponent],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
