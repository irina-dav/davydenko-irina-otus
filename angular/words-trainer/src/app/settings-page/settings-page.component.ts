import {Component, OnInit} from '@angular/core';
import {TrainingSettings} from '../shared/interfaces';
import {SettingsStorageService} from '../shared/settings-storage.service';
import {ViewService} from '../shared/view.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  settings: TrainingSettings;

  constructor(private storage: SettingsStorageService,
              private view: ViewService) {
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.settings = this.storage.loadTrainingSettings();
  }

  saveSettings(): void {
    this.storage.updateTrainingSettings(this.settings);
    this.view.notifySuccess('Settings were saved');
  }
}
