import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GithubService } from '../api/base/gifthub/github.service';
import { AppComponent } from '../app.component';
import { ConfigService } from '../app.config';
import { LayoutComponent } from '../layout/layout.component';
import { LoadingService } from '../libraries/loading.service';
import { MessageService } from '../libraries/message.service';
import { StorageService } from '../libraries/storage.service';
import { StringService } from '../libraries/string.service';
import { InvalidComponent } from '../views/invalid/invalid.component';

import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: LayoutComponent },
          { path: 'invalid', component: InvalidComponent },
        ]),
        HttpClientTestingModule,
        NgxSpinnerModule,
        MatSnackBarModule],
      declarations: [AppComponent, LayoutComponent, BaseComponent],
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
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
