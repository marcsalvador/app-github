import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../libraries/storage.service';
import { StringService } from '../libraries/string.service';
import { catchError, } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum RequestType {
    Post = 0,
    Get = 1,
    Beacon = 2
}

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(
        public http: HttpClient,
        public storageService: StorageService,
        public stringService: StringService,
        public snackbar: MatSnackBar
    ) {
    }

    public requestOptions: any;

    public sendRequest(url: string, model?: any, requestType?: RequestType): Observable<any> {
        if (requestType === undefined || requestType == null) {
            requestType = RequestType.Get;
        }
        switch (requestType) {
            case RequestType.Post: return this.post(url, model);
            case RequestType.Get: return this.get(url, model);
            case RequestType.Beacon: this.beacon(url, model); break;
        }
    }

    public post(url: string, model: any): Observable<any> {
        return this.http.post<any>(url, model, this.requestOptions)
            .pipe(catchError(this.handleError));
    }

    public get(url: string, model?: any): Observable<any> {
        const params = this.convertModelToParam(model);
        return this.http.get<any>(url + params, this.requestOptions)
            .pipe(catchError(this.handleError));
    }

    public beacon(url: string, model?: any): void {
        // Convert model to web form request
        const params = this.convertModelToParam(model);

        // Generate blob data
        const request = new Blob([params], this.requestOptions);

        // Send request using beacon
        navigator.sendBeacon(url, request);
    }

    handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            return throwError(error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            return throwError(error.error.message);
        }
    }

    convertModelToParam(model: any): string {
        let params = '';
        if (model !== undefined && model != null) {
            params = Object.keys(model)
                .map((k) => k + '=' + model[k])
                .join('&');
            if (this.stringService.IsNotEmpty(params)) {
                params = '?' + params;
            }
        }
        return params;
    }
}
