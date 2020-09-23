import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './views/home/home.component';
import { InvalidComponent } from './views/invalid/invalid.component';
import { OrganizationComponent } from './views/organization/organization.component';
import { RepositoryComponent } from './views/repository/repository.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
