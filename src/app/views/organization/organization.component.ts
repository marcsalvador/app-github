import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { SearchCriteria } from 'src/app/api/base/gifthub/github.models';
import { BaseComponent } from 'src/app/base/base.component';
import { MembersComponent } from '../members/members.component';
import { RepositoriesComponent } from '../repositories/repositories.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent extends BaseComponent implements OnInit, OnDestroy {

  public baseT;
  public parentT;

  public orgName = '';

  public searchCriteria = new SearchCriteria();

  @ViewChild('container', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;

  //#region Hooks
  ngOnInit(): void {
    this.parent.loadingService.show();
    this.parent.setTitle('Organization');

    this.activatedRoute.params.subscribe(params => {
      this.orgName = params.org;
      if (this.parent.stringService.IsEmpty(this.orgName)) {
        this.router.navigate(['']);
        return;
      }
      this.parent.initializeOrg(this.orgName);
    });

    this.parentT = this.parent.parentTriggerChild.subscribe(pe => {
      this.start();
    });

    this.baseT = this.baseTriggerChild.subscribe(event => {
      this.parent.setTitle(this.parent.org.name);
      this.getMembers();
      this.loadRepositories();
    });
  }

  ngOnDestroy(): void {
    this.baseT.unsubscribe();
    this.parentT.unsubscribe();
  }
  //#endregion

  //#region Repository
  searchByLanguage(language: string): void {
    this.searchCriteria = new SearchCriteria();
    this.searchCriteria.page = 1;
    this.searchCriteria.language = language;
    this.searchCriteria.search = '';
    this.loadRepositories(this.searchCriteria);
  }
  //#endregion

  //#region Common
  stopLoadingFirstLoad(): void {
    this.parent.loadingService.hide();
    this.scrollTop();
  }
  //#endregion

  //#region Members
  getMembers(): void {
    this.gitHubService.getMembers(this.parent.org.name)
      .subscribe(
        results => {
          this.parent.members = results;
        },
        err => {
          this.messageService.error(err);
          this.parent.loadingService.hide();
          this.router.navigate(['']);
        });
  }
  //#endregion

  //#region Load Components
  loadMembers(): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MembersComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.load(1, this.parent.org.members_url, 'Members');
  }

  loadRepositories(searchCriteria?: SearchCriteria): void {
    if (this.viewContainerRef != null) { this.viewContainerRef.clear(); }
    const factory = this.componentFactoryResolver.resolveComponentFactory(RepositoriesComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    ref.instance.searchCriteria = searchCriteria == null ? new SearchCriteria() : searchCriteria;
  }
  //#endregion
}
