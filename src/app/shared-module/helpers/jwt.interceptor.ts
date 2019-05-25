import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './../auth-service/authentication.service';

@Injectable({
    providedIn: 'root'
  })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = sessionStorage.getItem('token');
        const loginUser = sessionStorage.getItem('loginUser');
        if (loginUser && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }

        return next.handle(request);
    }
}
