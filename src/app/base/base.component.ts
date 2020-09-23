import { Component, ComponentFactoryResolver, forwardRef, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { GithubService } from '../api/base/gifthub/github.service';
import { LayoutComponent } from '../layout/layout.component';
import { MessageService } from '../libraries/message.service';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent {

  public baseTriggerChild: Subject<any> = new Subject();

  constructor(
    @Inject(forwardRef(() => LayoutComponent)) public parent: LayoutComponent,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public componentFactoryResolver: ComponentFactoryResolver,
    public gitHubService: GithubService,
    public messageService: MessageService,
  ) {

  }

  start(): void {
    this.parent.loadingService.show();
    if (this.isCookiesEnabled()) {
      this.baseTriggerChild.next('go');
    }
    else {
      this.parent.loadingService.hide();
      this.router.navigate(['invalid']);
      this.messageService.error('Browser cookies is disable.');
    }
  }

  scrollTop(): void {
    location.hash = '#top';
  }

  isCookiesEnabled(): boolean {
    let cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf('testcookie') !== -1) ? true : false;
    }
    return (cookieEnabled);
  }

  openSite(url): void {
    window.open(url);
  }
}

