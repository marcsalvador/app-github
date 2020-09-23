import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public spinnerService: NgxSpinnerService) { }

  public message = 'Loading...';

  public show(msg?: string): void {
    if (msg != null) { this.message = msg; }
    this.spinnerService.show();
  }

  public hide(): void {
    this.spinnerService.hide();
  }

}
