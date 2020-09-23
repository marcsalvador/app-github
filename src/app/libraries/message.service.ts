import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StringService } from './string.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageLoadingDuration = 3000;

  constructor(
    private snackbar: MatSnackBar) {
  }

  error(message: any): void {
    this.snackbar.open(message, null, {
      duration: this.messageLoadingDuration,
    });
  }

  info(message: string): void {
    this.snackbar.open(message, null, {
      duration: this.messageLoadingDuration,
    });
  }

  success(message: string): void {
    this.snackbar.open(message, null, {
      duration: this.messageLoadingDuration,
    });
  }

}
