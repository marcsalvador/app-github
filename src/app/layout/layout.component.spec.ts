import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from '../api/base/gifthub/github.service';
import { AppComponent } from '../app.component';
import { ConfigService } from '../app.config';
import { LoadingService } from '../libraries/loading.service';
import { MessageService } from '../libraries/message.service';
import { StorageService } from '../libraries/storage.service';
import { StringService } from '../libraries/string.service';
import { LayoutComponent } from './layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { InvalidComponent } from '../views/invalid/invalid.component';
import { OrganizationComponent } from '../views/organization/organization.component';
import { RepositoryComponent } from '../views/repository/repository.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'orgs/:org', component: OrganizationComponent },
      { path: 'repository/:org/:repo', component: RepositoryComponent },
      { path: 'invalid', component: InvalidComponent },
      { path: '**', component: InvalidComponent },
    ]
  }
];

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        NgxSpinnerModule,
        MatSnackBarModule],
      declarations: [AppComponent, LayoutComponent],
      providers: [
        Title,
        FormBuilder,
        ConfigService,
        StorageService,
        StringService,
        LoadingService,
        GithubService,
        MessageService,
        HttpClient]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
