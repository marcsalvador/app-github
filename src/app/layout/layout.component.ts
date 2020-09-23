import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { Organization } from 'src/app/api/base/gifthub/github.models';
import { GithubService } from 'src/app/api/base/gifthub/github.service';
import { ConfigService } from 'src/app/app.config';
import { LoadingService } from 'src/app/libraries/loading.service';
import { MessageService } from 'src/app/libraries/message.service';
import { StorageService } from 'src/app/libraries/storage.service';
import { StringService } from 'src/app/libraries/string.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public org: Organization;
  public members: any[];
  public languages = [];
  public parentTriggerChild: Subject<any> = new Subject();

  constructor(
    public router: Router,
    public titleService: Title,
    public configService: ConfigService,
    public storageService: StorageService,
    public stringService: StringService,
    public loadingService: LoadingService,
    public gitHubService: GithubService,
    public messageService: MessageService) { }

  //#region Hooks
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }
  //#endregion

  public setTitle(view: string = ''): void {
    view = this.stringService.IsEmpty(view) ? '' : '' + view;
    this.titleService.setTitle(view);
  }

  public initializeOrg(orgName: string): void {
    this.loadingService.show();
    const org = this.gitHubService.getOrganization(orgName);
    forkJoin([org]).subscribe(
      results => {
        this.org = results[0];
        this.parentTriggerChild.next('go');
        this.loadingService.hide();
      },
      error => {
        this.messageService.error(error);
        this.loadingService.hide();
        this.router.navigate(['']);
      });
  }
}
