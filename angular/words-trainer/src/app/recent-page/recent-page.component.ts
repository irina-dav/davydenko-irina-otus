import {Component, OnInit} from '@angular/core';
import {Translation} from '../interfaces';
import words from '../words.json';

@Component({
  selector: 'app-recent-page',
  templateUrl: './recent-page.component.html',
  styleUrls: ['./recent-page.component.scss']
})
export class RecentPageComponent implements OnInit {

  recentWords: Translation[] = words;

  constructor() {
  }

  ngOnInit(): void {
  }

}
