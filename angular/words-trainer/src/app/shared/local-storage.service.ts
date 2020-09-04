import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
