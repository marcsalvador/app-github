import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { SearchCriteria } from 'src/app/api/base/gifthub/github.models';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent extends BaseComponent implements OnInit, OnDestroy {

  public showFilter = false;
  public formGroup: FormGroup;
  public searchCriteria = new SearchCriteria();
  public itemTotalCount = 0;
  public itemPerPage = 30;

  public result: any;
  public repositories: any[];

  public repoLanguges = [];
  public langSub: Subscription;

  public members: any;

  //#region Hooks
  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    if (this.langSub != null) { this.langSub.unsubscribe(); }
  }
  //#endregion

  load(): void {
    this.initializeSearchForm();
  }

  //#region Repository
  initializeSearchForm(): void {
    this.formGroup = this.formBuilder.group({
      search: new FormControl({ value: '' }),
      type: new FormControl({ value: '' }),
      language: new FormControl({ value: '' }),
      sort: new FormControl({ value: '' })
    });
    setTimeout(() => {
      this.formGroup.patchValue(this.searchCriteria);
      this.search(1);
    }, 300);
  }

  filterSearch(): void {
    setTimeout(() => {
      this.search();
    }, 300);
  }

  pageChanged(event: any): void {
    this.search(event.page);
  }

  searchByLanguage(language): void {
    this.searchCriteria = this.formGroup.getRawValue();
    this.searchCriteria.page = 1;
    this.searchCriteria.language = language;
    this.searchCriteria.search = '';
    this.searchRepositories();
  }

  search(page: number = 1): void {
    this.searchCriteria = this.formGroup.getRawValue();
    this.searchCriteria.page = page;
    this.searchRepositories();
  }

  searchRepositories(): void {
    this.generateRepositorySearchQuery();
    this.gitHubService.searchRepositories(this.searchCriteria)
      .subscribe((data) => {
        this.result = data;
        this.itemTotalCount = data.total_count;
        this.repositories = data.items;
        this.asyncRequest();
      });
  }

  generateRepositorySearchQuery(): void {
    if (this.parent.stringService.IsEmpty(this.searchCriteria.page) || this.searchCriteria.page === 0) { this.searchCriteria.page = 1; }
    this.searchCriteria.q = 'org:' + this.parent.org.login;
    if (this.parent.stringService.IsNotEmpty(this.searchCriteria.search)) {
      this.searchCriteria.q += '+' + this.searchCriteria.search.replace(' ', '+') + '+in:name';
    }
    if (this.parent.stringService.IsNotEmpty(this.searchCriteria.language) && this.searchCriteria.language !== 'all') {
      this.searchCriteria.q += '+language:' + this.searchCriteria.language.replace(' ', '+') + '';
    }
  }
  //#endregion

  //#region Language and Members
  asyncRequest(): void {
    if (this.parent.languages !== null && this.parent.languages.length > 0) { return; }

    // Language
    const requests = [];
    for (const repo of this.repositories) {
      requests.push(this.gitHubService.getLanguages(repo.languages_url));
    }

    this.langSub = forkJoin(requests)
      .subscribe(
        results => {
          for (let a = 0; a < results.length; a++) {
            this.repoLanguges.push(results[a]);
            this.repositories[a].languages = results[a];
          }
          this.sortLanguages();
        },
        err => {
          this.messageService.error(err);
          this.parent.loadingService.hide();
          this.router.navigate(['']);
        });
  }

  sortLanguages(): void {
    this.parent.languages = [];
    for (const item of this.repoLanguges) {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const language = this.parent.languages.find(x => x.language === key);
          if (language === null || language === undefined) {
            this.parent.languages.push({ language: key, value: item[key] });
          }
          else {
            language.value += item[key];
          }
        }
      }
    }
    this.parent.languages.sort((a, b) => (a.value < b.value) ? 1 : -1);
  }
  //#endregion
}
