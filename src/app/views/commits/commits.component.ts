import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.scss']
})
export class CommitsComponent extends BaseComponent implements OnInit, OnDestroy {

  public results: any[];
  public pageNo = 1;
  public enablePreviousButton = false;
  public enableNextButton = true;
  public url: string;
  public name: string;

  //#region Hooks
  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
  //#endregion

  load(page, url, name): void {
    this.url = url;
    this.name = name;
    this.getData(page);
  }

  //#region Issues
  public getData(page): void {
    this.gitHubService.urlRequestArray(this.url.replace('{/sha}', '') + '?per_page=10&page=' + page)
      .subscribe(
        result => {
          this.enableNextButton = true;
          if (result === null || result.length === 0) {
            this.enableNextButton = false;
            this.pageNo--;
          }
          else {
            this.results = result;
            this.enableNextButton = true;
          }
        },
        error => {
          this.pageNo--;
          this.enableNextButton = false;
          this.messageService.error(error);
        });
  }

  previous(): void {
    if (this.pageNo === 1) { return; }
    this.pageNo--;
    if (this.pageNo === 1) { this.enablePreviousButton = false; }
    this.getData(this.pageNo);
  }

  next(): void {
    this.pageNo++;
    this.enablePreviousButton = true;
    this.getData(this.pageNo);
  }
  //#endregion
}
