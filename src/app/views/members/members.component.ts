import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent extends BaseComponent implements OnInit, OnDestroy {

  public members: any[];
  public membersPage = 1;
  public isMembersVisible = false;
  public enableMembersPreviousButton = false;
  public enableMembersNextButton = true;

  private url: string;

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
    this.getMembers(page);
  }

  //#region Issues
  public getMembers(page): void {
    this.gitHubService.urlRequestArray(this.url.replace('{/member}', '') + '?per_page=20&page=' + page)
      .subscribe(
        result => {
          if (result === null || result.length === 0) {
            this.enableMembersNextButton = false;
            this.membersPage--;
          }
          else {
            this.members = result;
            this.enableMembersNextButton = true;
          }
        },
        error => {
          this.membersPage--;
          this.enableMembersNextButton = false;
          this.messageService.error(error);
        });
  }

  issuesPrevious(): void {
    if (this.membersPage === 1) { return; }
    this.membersPage--;
    if (this.membersPage === 1) { this.enableMembersPreviousButton = false; }
    this.getMembers(this.membersPage);
  }

  issuesNext(): void {
    this.membersPage++;
    this.enableMembersPreviousButton = true;
    this.getMembers(this.membersPage);
  }
  //#endregion
}
