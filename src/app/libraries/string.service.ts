import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  public IsEmpty(str: any): boolean {
    if (str == null ||
      str === undefined ||
      str === '') {
      return true;
    }
    return false;
  }

  public IsNotEmpty(str: any): boolean {
    if (str != null &&
      str !== undefined &&
      str !== '') {
      return true;
    }
    return false;
  }

}
