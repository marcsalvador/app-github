import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import markdown from 'markdown-html-viewer';
import { stringify } from 'querystring';
import { BaseComponent } from 'src/app/base/base.component';
import { MembersComponent } from '../members/members.component';

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

  public contents: any[];
  public readme: string;
  public isReadMeVisible = true;

  public commits: any[];
  public commitPage = 1;
  public isCommitsVisible = false;
  public enableCommitPreviousButton = false;
  public enableCommitNextButton = true;

  public issues: any[];
  public issuesPage = 1;
  public isIssuesVisible = false;
  public enableIssuesPreviousButton = false;
  public enableIssuesNextButton = true;

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
          this.getContent();
          this.getContributors();
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

  //#region Content and Read Me
  showReadMe(): void {
    if (this.isReadMeVisible) { return; }
    this.isReadMeVisible = true;
    this.isIssuesVisible = false;
    this.isCommitsVisible = false;
  }

  getContent(): void {
    this.gitHubService.urlRequestArray(this.repository.contents_url.replace('/{+path}', ''))
      .subscribe(
        result => {
          this.contents = result;
          const content = this.contents.find(x => x.name === 'README.md');
          if (content !== null && content !== undefined && this.parent.stringService.IsNotEmpty(content.download_url)) {
            markdown.convert(content.download_url, 'html').then(data => {
              this.readme = data;
            });
          }
          else {
            this.readme = '1';
          }
        },
        error => {
          this.messageService.error(error);
        });
  }
  //#endregion

  //#region Commits
  showCommits(): void {
    if (this.isCommitsVisible) { return; }
    this.isCommitsVisible = true;
    this.isReadMeVisible = false;
    this.isIssuesVisible = false;
    this.getCommits(1);
  }

  getCommits(page): void {
    this.gitHubService.urlRequestArray(this.repository.commits_url.replace('{/sha}', '') + '?per_page=10&page=' + page)
      .subscribe(
        result => {
          this.enableCommitNextButton = true;
          if (result === null || result.length === 0) {
            this.enableCommitNextButton = false;
            this.commitPage--;
          }
          else {
            this.commits = result;
            this.enableCommitNextButton = true;
          }
        },
        error => {
          this.commitPage--;
          this.enableCommitNextButton = false;
          this.messageService.error(error);
        });
  }

  commitPrevious(): void {
    if (this.commitPage === 1) { return; }
    this.commitPage--;
    if (this.commitPage === 1) { this.enableCommitPreviousButton = false; }
    this.getCommits(this.commitPage);
  }

  commitNext(): void {
    this.commitPage++;
    this.enableCommitPreviousButton = true;
    this.getCommits(this.commitPage);
  }
  //#endregion

  //#region Issues
  showIssues(): void {
    if (this.isIssuesVisible) { return; }
    this.isIssuesVisible = true;
    this.isCommitsVisible = false;
    this.isReadMeVisible = false;
    this.viewContainerRef.clear();
    this.getIssues(1);
  }

  getIssues(page): void {
    this.gitHubService.urlRequestArray(this.repository.issues_url.replace('{/number}', '') + '?per_page=10&page=' + page)
      .subscribe(
        result => {
          if (result === null || result.length === 0) {
            this.enableIssuesNextButton = false;
            this.issuesPage--;
          }
          else {
            this.issues = result;
            this.enableIssuesNextButton = true;
          }
        },
        error => {
          this.issuesPage--;
          this.enableIssuesNextButton = false;
          this.messageService.error(error);
        });
  }

  issuesPrevious(): void {
    if (this.issuesPage === 1) { return; }
    this.issuesPage--;
    if (this.issuesPage === 1) { this.enableIssuesPreviousButton = false; }
    this.getIssues(this.issuesPage);
  }

  issuesNext(): void {
    this.issuesPage++;
    this.enableIssuesPreviousButton = true;
    this.getIssues(this.issuesPage);
  }
  //#endregion

  //#region Load Components
  loadStar(): void {
    this.isIssuesVisible = false;
    this.isCommitsVisible = false;
    this.isReadMeVisible = false;
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.stargazers_url, 'Stargazers');
  }

  loadForks(): void {
    this.isIssuesVisible = false;
    this.isCommitsVisible = false;
    this.isReadMeVisible = false;
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.forks_url, 'Forks');
  }

  loadWatch(): void {
    this.isIssuesVisible = false;
    this.isCommitsVisible = false;
    this.isReadMeVisible = false;
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.subscribers_url, 'Watchers');
  }

  loadContributors(): void {
    this.isIssuesVisible = false;
    this.isCommitsVisible = false;
    this.isReadMeVisible = false;
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.repository.contributors_url, 'Contributors');
  }
  //#endregion
}

