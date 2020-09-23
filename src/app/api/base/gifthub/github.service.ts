import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { BaseService } from '../../base-service';

@Injectable({
  providedIn: 'root'
})
export class GithubService extends BaseService {

  private gitHubApiUrl = 'https://api.github.com/';

  getOrganization(organizationName: string): Observable<any> {
    return this.sendRequest(this.gitHubApiUrl + 'orgs/' + organizationName);
  }

  searchRepositories(model: any): Observable<any> {
    return this.sendRequest(this.gitHubApiUrl + 'search/repositories', model);
  }

  getRepository(org: string, repo: any): Observable<any> {
    return this.sendRequest(this.gitHubApiUrl + 'repos/' + org + '/' + repo);
  }

  getMembers(organizationName: string): Observable<any> {
    const model = {
      role: 'all'
    };
    return this.sendRequest(this.gitHubApiUrl + 'orgs/' + organizationName + '/members', model);
  }

  getLanguages(requestUrl: string): Observable<any[]> {
    return this.sendRequest(requestUrl);
  }

  urlRequestArray(requestUrl: string): Observable<any[]> {
    return this.sendRequest(requestUrl);
  }

  urlRequest(requestUrl: string): Observable<any> {
    return this.sendRequest(requestUrl);
  }

}
