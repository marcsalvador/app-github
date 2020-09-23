import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseComponent } from 'src/app/base/base.component';
import { LayoutComponent } from 'src/app/layout/layout.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { AppComponent } from 'src/app/app.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GithubService } from 'src/app/api/base/gifthub/github.service';
import { ConfigService } from 'src/app/app.config';
import { LoadingService } from 'src/app/libraries/loading.service';
import { MessageService } from 'src/app/libraries/message.service';
import { StorageService } from 'src/app/libraries/storage.service';
import { StringService } from 'src/app/libraries/string.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: '', component: LayoutComponent,
            children: [
              { path: '', component: HomeComponent }
            ]
          },
        ]),
        HttpClientTestingModule,
        NgxSpinnerModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule],
      declarations: [AppComponent, LayoutComponent, BaseComponent, HomeComponent],
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
