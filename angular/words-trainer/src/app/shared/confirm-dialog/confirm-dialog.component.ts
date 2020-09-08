import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ViewService} from '../view.service';

declare var $: any;

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {

  message: any;
  sub: Subscription;
  @ViewChild('btnShowModal') btnShowModal: ElementRef<HTMLElement>;

  constructor(private view: ViewService) {
  }

  ngOnInit(): void {
    this.sub = this.view.getMessage().subscribe(message => {
      this.message = message;
      this.btnShowModal.nativeElement.click();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
