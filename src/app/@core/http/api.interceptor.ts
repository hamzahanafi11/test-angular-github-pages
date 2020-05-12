import { CredentialsService } from '@app/auth';
import { I18nService } from '@app/i18n';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private credentialsService: CredentialsService,
    private router: Router,
    private i18nService: I18nService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req;
    if (req['url'] && req.url.indexOf('/sign-in') === -1) {
      let reqHeaders = req.headers;
      const token = this.credentialsService.credentials.token;

      if (
        this.credentialsService.isAuthenticated &&
        this.credentialsService.credentials.token
      ) {
        reqHeaders = reqHeaders.append('Authorization', `Bearer ${token}`);
      }

      if (!req.headers.has('Content-Type') && !(req.body instanceof FormData)) {
        // If the body is a FormData instance, assume this is a file upload request
        // and let the browser add the multipart content type with the correct boundary value
        reqHeaders = reqHeaders.append('Content-Type', 'application/json');
      }

      reqHeaders = reqHeaders.append(
        'Accept-Language',
        this.i18nService.language
      );

      const newUrl = req['url'];

      newReq = req.clone({
        url: newUrl,
        headers: reqHeaders,
        params: req.params,
      });
    }

    return next.handle(newReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
      }),
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            // this.appLocalStorage.cleanAll();
            //this.router.navigate(['/login']);
            // this.commonService.checkAndRedirectToLogin();
          }
          return throwError(error);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }
}
