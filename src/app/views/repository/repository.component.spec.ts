import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GithubService } from 'src/app/api/base/gifthub/github.service';
import { AppComponent } from 'src/app/app.component';
import { ConfigService } from 'src/app/app.config';
import { BaseComponent } from 'src/app/base/base.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { LoadingService } from 'src/app/libraries/loading.service';
import { MessageService } from 'src/app/libraries/message.service';
import { StorageService } from 'src/app/libraries/storage.service';
import { StringService } from 'src/app/libraries/string.service';
import { OrganizationComponent } from '../organization/organization.component';

import { RepositoryComponent } from './repository.component';

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(
          [{
            path: '', component: LayoutComponent,
            children: [
              { path: 'orgs', component: OrganizationComponent }
            ]
          }]),
        HttpClientTestingModule,
        NgxSpinnerModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule],
      declarations: [AppComponent, LayoutComponent, BaseComponent, RepositoryComponent],
      providers: [
        Title,
        FormBuilder,
        ConfigService,
        StorageService,
        StringService,
        LoadingService,
        GithubService,
        MessageService,
        HttpClient,
        LayoutComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
