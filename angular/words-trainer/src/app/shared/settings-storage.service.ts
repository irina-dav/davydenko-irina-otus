import {Injectable} from '@angular/core';
import defaultSettings from './defaultSettings.json';
import {TrainingSettings} from './interfaces';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsStorageService {

  constructor(private storage: LocalStorageService) {
  }

  private getDefaultTrainingSettings = (): TrainingSettings => defaultSettings as TrainingSettings;

  loadTrainingSettings(): TrainingSettings {
    const settings = this.storage.getItem('trainingSettings');
    return settings ? JSON.parse(settings) : this.getDefaultTrainingSettings();
  }

  updateTrainingSettings(settings: TrainingSettings): void {
    this.storage.setItem('trainingSettings', JSON.stringify(settings));
  }

}
