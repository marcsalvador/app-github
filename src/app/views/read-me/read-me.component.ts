import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import markdown from 'markdown-html-viewer';
@Component({
  selector: 'app-read-me',
  templateUrl: './read-me.component.html',
  styleUrls: ['./read-me.component.scss']
})
export class ReadMeComponent extends BaseComponent implements OnInit, OnDestroy {

  public readme: string;

  //#region Hooks
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }
  //#endregion

  load(url): void {
    this.getData(url);
  }

  //#region Issues
  public getData(url): void {
    this.gitHubService.urlRequestArray(url.replace('{+path}', '') + '?per_page=10&page=' + url)
      .subscribe(
        result => {
          const contents = result;
          const content = contents.find(x => x.name === 'README.md');
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
}
