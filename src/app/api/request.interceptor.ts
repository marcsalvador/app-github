import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        delay(5000);
        return next.handle(request);
    }
}
