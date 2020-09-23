import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public config: AppConfigModel;

    constructor(private http: HttpClient) { }

    load(): any {
        const date = new Date();
        const qDate = date.getFullYear().toString() +
            date.getMonth().toString() +
            date.getDay().toString() +
            date.getHours().toString() +
            date.getMinutes().toString() +
            date.getSeconds().toString();

        let env = 'development';
        if (environment.production) { env = 'production'; }

        const obj = this.http
            .get<AppConfigModel>('./assets/config/' + env + '.json' + '?v=' + qDate)
            .toPromise()
            .then(
                (data) => {
                    this.config = data;
                },
                (error) => {
                    console.error(error);
                }
            );

        return obj;
    }
}

export class AppConfigModel {
    public appName: string;

    public title: string;
    public icon: string;
    public subTitle: string;
    public copyright: string;

    public appUrl: string;
    public apiUrl: string;
    public apiKey: string;
    public version: string;
    public sessionGroupCode: string;

    public theme: string;
    public locale: string;

    public idleTimeOut: number;

    public showSampleAccessToken: boolean;
    public sampleAccessToken: string;
}

