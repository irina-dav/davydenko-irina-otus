import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  wordsNumber = 12;
  wordsNumberMin = 1;
  wordsNumberMax = 20;

  duration = 5;
  durationMin = 3;
  durationMax = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
