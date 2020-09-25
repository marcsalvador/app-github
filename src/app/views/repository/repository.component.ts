import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { CommitsComponent } from '../commits/commits.component';
import { IssuesComponent } from '../issues/issues.component';
import { MembersComponent } from '../members/members.component';
import { ReadMeComponent } from '../read-me/read-me.component';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent extends BaseComponent implements OnInit, OnDestroy {

  public baseT;
  public parentT;

  public repoName: string;
  public orgName: string;

  public repository: any;

  public languages: any[];
  public members: any[];
  public contributors: any[];

  @ViewChild('container', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;

  //#region Hooks
  ngOnInit(): void {
    this.parent.loadingService.show();
    this.parent.setTitle('Repository');

    this.baseT = this.baseTriggerChild.subscribe(event => {
      this.getRepository();
      this.parent.loadingService.hide();
    });

    this.parentT = this.parent.parentTriggerChild.subscribe(pe => {
      this.start();
    });

    this.activatedRoute.params.subscribe(params => {
      this.repoName = params.repo;
      this.orgName = params.org;
      if (this.parent.stringService.IsEmpty(this.repoName)) {
        if (this.parent.stringService.IsEmpty(this.parent.org)) {
          this.router.navigate(['orgs']);
          return;
        }
        else {
          this.router.navigate(['orgs', this.parent.org.login]);
          return;
        }
      }
      if (this.parent.org != null) {
        this.parent.parentTriggerChild.next('go');
      }
      else {
        this.parent.initializeOrg(this.orgName);
      }
    });
  }

  ngOnDestroy(): void {
    this.baseT.unsubscribe();
    this.parentT.unsubscribe();
  }
  //#endregion

  getRepository(): void {
    this.gitHubService.getRepository(this.orgName, this.repoName)
      .subscribe(
        result => {
          this.repository = result;
          this.getLanguages();
          this.getContributors();
          this.showReadMe();
        },
        error => {
          this.messageService.error(error);
        });
  }

  backToOrg(): void {
    this.router.navigate(['orgs', this.orgName]);
  }

  //#region Languages
  getLanguages(): void {
    this.gitHubService.getLanguages(this.repository.languages_url)
      .subscribe(
        result => {
          this.sortLanguages(result);
        },
        error => {
          this.messageService.error(error);
        });
  }

  sortLanguages(rLanguage: any): void {
    this.languages = [];
    // tslint:disable-next-line: forin
    for (const key in rLanguage) {
      if (rLanguage.hasOwnProperty(key)) {
        const language = this.languages.find(x => x.language === key);
        if (language === null || language === undefined) {
          this.languages.push({ language: key, value: rLanguage[key] });
        }
        else {
          language.value += rLanguage[key];
        }
      }
      this.languages.sort((a, b) => (a.value < b.value) ? 1 : -1);
    }
  }
  //#endregion

  //#region Contributors
  getContributors(): void {
    this.gitHubService.urlRequestArray(this.repository.contributors_url)
      .subscribe(
        result => {
          this.members = result;
        },
        error => {
          this.messageService.error(error);
        });
  }
  //#endregion

  //#region Load Components
  showReadMe(): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(ReadMeComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(this.repository.contents_url);
  }

  showIssues(): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(IssuesComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.issues_url, 'Issues');
  }

  showCommits(): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(CommitsComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.commits_url, 'Commits');
  }

  loadStar(): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.stargazers_url, 'Stargazers');
  }

  loadForks(): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.forks_url, 'Forks');
  }

  loadWatch(): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.subscribers_url, 'Watchers');
  }

  loadContributors(): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.contributors_url, 'Contributors');
  }
  //#endregion
}

