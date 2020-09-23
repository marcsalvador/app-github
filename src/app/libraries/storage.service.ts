import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearAll(): void {
    localStorage.clear();
  }
}
