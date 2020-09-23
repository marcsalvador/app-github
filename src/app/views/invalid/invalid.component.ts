import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.scss']
})
export class InvalidComponent extends BaseComponent implements OnInit, OnDestroy {

  public baseT;
  public parentT;

  public repoName: string;

  //#region Hooks
  ngOnInit(): void {
    this.parent.loadingService.show();
    this.baseT = this.baseTriggerChild.subscribe(event => {
      this.parent.setTitle('Invalid');
    });
    this.start();
  }

  ngOnDestroy(): void {
    this.baseT.unsubscribe();
    this.parentT.unsubscribe();
  }
  //#endregion

  goBackToRepositories(): void {
    this.router.navigate(['repositories']);
  }

  setAccessToken(): void {
    this.router.navigate(['']);
  }
}
