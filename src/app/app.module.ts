import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { defineLocale } from 'ngx-bootstrap/chronos';

import {
  arLocale, bgLocale, caLocale, csLocale, daLocale, deLocale, enGbLocale,
  esDoLocale, esLocale, esUsLocale, etLocale, fiLocale, frLocale, glLocale,
  heLocale, hiLocale, huLocale, idLocale, itLocale, jaLocale, koLocale, ltLocale,
  mnLocale, nbLocale, nlBeLocale, nlLocale, plLocale, ptBrLocale, roLocale,
  ruLocale, skLocale, slLocale, svLocale, thLocale, trLocale, viLocale, zhCnLocale
} from 'ngx-bootstrap/locale';

defineLocale('ar', arLocale);
defineLocale('bg', bgLocale);
defineLocale('ca', caLocale);
defineLocale('cs', csLocale);
defineLocale('da', daLocale);
defineLocale('de', deLocale);
defineLocale('en-gb', enGbLocale);
defineLocale('es', esDoLocale);
defineLocale('es', esLocale);
defineLocale('es-us', esUsLocale);
defineLocale('et', etLocale);
defineLocale('fi', fiLocale);
defineLocale('fr', frLocale);
defineLocale('gl', glLocale);
defineLocale('he', heLocale);
defineLocale('hi', hiLocale);
defineLocale('hu', huLocale);
defineLocale('id', idLocale);
defineLocale('it', itLocale);
defineLocale('ja', jaLocale);
defineLocale('ko', koLocale);
defineLocale('lt', ltLocale);
defineLocale('mn', mnLocale);
defineLocale('nb', nbLocale);
defineLocale('nl-be', nlBeLocale);
defineLocale('nl', nlLocale);
defineLocale('pl', plLocale);
defineLocale('pt', ptBrLocale);
defineLocale('ro', roLocale);
defineLocale('ru', ruLocale);
defineLocale('sk', skLocale);
defineLocale('sl', slLocale);
defineLocale('sv', svLocale);
defineLocale('th', thLocale);
defineLocale('tr', trLocale);
defineLocale('vi', viLocale);
defineLocale('zh-cn', zhCnLocale);

import { AppRoutingModule } from './app.routes';

import { ConfigService } from './app.config';

import { InvalidComponent } from './views/invalid/invalid.component';
import { HomeComponent } from './views/home/home.component';
import { OrganizationComponent } from './views/organization/organization.component';
import { DateAgoPipe } from './pipe/date-pipe-ago';
import { RepositoryComponent } from './views/repository/repository.component';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RequestInterceptor } from './api/request.interceptor';
import { MembersComponent } from './views/members/members.component';
import { RepositoriesComponent } from './views/repositories/repositories.component';
import { LayoutComponent } from './layout/layout.component';
import { BaseComponent } from './base/base.component';
import { AppComponent } from './app.component';
import { CommitsComponent } from './views/commits/commits.component';
import { IssuesComponent } from './views/issues/issues.component';
import { ReadMeComponent } from './views/read-me/read-me.component';

@NgModule({
  declarations: [
    AppComponent,
    InvalidComponent,
    HomeComponent,
    OrganizationComponent,
    DateAgoPipe,
    RepositoryComponent,
    MembersComponent,
    RepositoriesComponent,
    LayoutComponent,
    BaseComponent,
    CommitsComponent,
    IssuesComponent,
    ReadMeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot()
  ],
  entryComponents: [
    MembersComponent,
    RepositoriesComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    FormBuilder,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (appConfigService: ConfigService) => {
        return () => {
          return appConfigService.load();
        };
      }
    },
    {
      provide: LOCALE_ID,
      deps: [ConfigService],
      useFactory: (appConfigService: ConfigService) => appConfigService.config.locale
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
