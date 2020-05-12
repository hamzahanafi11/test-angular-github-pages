import { Injectable } from '@angular/core';
// import { AppLocalStorage } from '../utils/local.storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
export interface GenericResponseObject {
  text: () => {};
  blob: () => {};
  json: () => {};
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // public apiHostName = environment.API;

  constructor(
    private httpClient: HttpClient,
    // private appLocalStorage: AppLocalStorage,
    public router: Router
  ) {}

  public get(url: string, options?: any): Observable<any> {
    if (!options || (options && !options['observe'])) {
      options = Object.assign({}, options, { observe: 'response' });
    }
    return this.httpClient.get<GenericResponseObject>(url, options).pipe(
      tap((res) => {
        if (
          options &&
          options['responseType'] &&
          options['responseType'] === 'blob'
        ) {
          res['blob'] = () => {
            const blob1: [any] = [res['body']];
            const blob2: [any] = [res];
            return options && options['observe'] === 'response'
              ? new Blob(blob1, { type: '*/*' })
              : new Blob(blob2, { type: '*/*' });
          };
        } else {
          res['text'] = () => {
            return options && options['observe'] === 'response'
              ? JSON.stringify(res['body'])
              : JSON.stringify(res);
          };
          res['json'] = () => {
            return options && options['observe'] === 'response'
              ? res['body']
              : res;
          };
        }
        return of(res);
      }),
      catchError((error: any) => {
        error['text'] = () => {
          return error['error'];
        };
        return throwError(error);
      })
    );
  }

  // public post(url: string, body: any, options?: any): Observable<any> {
  //   if (!options || (options && !options['observe'])) {
  //     options = Object.assign({}, options, { 'observe': 'response' });
  //   }
  //   return this.httpClient.post<GenericResponseObject>(url, body, options).pipe(
  //     tap((res) => {
  //       if (options && options['responseType'] && options['responseType'] === 'blob') {
  //         res['blob'] = () => {
  //           const blob1: [any] = [res['body']];
  //           const blob2: [any] = [res];
  //           return (options && options['observe'] === 'response' ? new Blob(blob1, { type: '*/*' }) : new Blob(blob2, { type: '*/*' }));
  //         };
  //         res['blobTyped'] = () => {
  //           const blob1: [any] = [res['body']];
  //           const blob2: [any] = [res];
  //           return (options && options['observe'] === 'response' ? new Blob(blob1, { type: options.type }) : new Blob(blob2, { type: options.type }));
  //         };
  //       } else {
  //         res['text'] = () => {
  //           return (options && options['observe'] === 'response' ? JSON.stringify(res['body']) : JSON.stringify(res));
  //         };
  //         res['json'] = () => {
  //           return (options && options['observe'] === 'response' ? res['body'] : res);
  //         };
  //       }
  //       return of(res);
  //     }),
  //     catchError((error: any) => {
  //       error['text'] = () => {
  //         return error['error'];
  //       };
  //       return throwError(error);
  //     })
  //   );
  // }

  // public put(url: string, body: any, options?): Observable<any> {
  //   if (!options || (options && !options['observe'])) {
  //     options = Object.assign({}, options, { 'observe': 'response' });
  //   }
  //   return this.httpClient.put<GenericResponseObject>(url, body, options).pipe(
  //     tap((res) => {
  //       if (options && options['responseType'] && options['responseType'] === 'blob') {
  //         res['blob'] = () => {
  //           const blob1: [any] = [res['body']];
  //           const blob2: [any] = [res];
  //           return (options && options['observe'] === 'response' ? new Blob(blob1, { type: '*/*' }) : new Blob(blob2, { type: '*/*' }));
  //         };
  //       } else {
  //         res['text'] = () => {
  //           return (options && options['observe'] === 'response' ? JSON.stringify(res['body']) : JSON.stringify(res));
  //         };
  //         res['json'] = () => {
  //           return (options && options['observe'] === 'response' ? res['body'] : res);
  //         };
  //       }
  //       return of(res);
  //     }),
  //     catchError((error: any) => {
  //       error['text'] = () => {
  //         return error['error'];
  //       };
  //       return throwError(error);
  //     })
  //   );
  // }

  // public delete(url: string, options?): Observable<any> {
  //   if (!options || (options && !options['observe'])) {
  //     options = Object.assign({}, options, { 'observe': 'response' });
  //   }
  //   return this.httpClient.delete<GenericResponseObject>(url, options).pipe(
  //     tap((res) => {
  //       if (options && options['responseType'] && options['responseType'] === 'blob') {
  //         res['blob'] = () => {
  //           const blob1: [any] = [res['body']];
  //           const blob2: [any] = [res];
  //           return (options && options['observe'] === 'response' ? new Blob(blob1, { type: '*/*' }) : new Blob(blob2, { type: '*/*' }));
  //         };
  //       } else {
  //         res['text'] = () => {
  //           return (options && options['observe'] === 'response' ? JSON.stringify(res['body']) : JSON.stringify(res));
  //         };
  //         res['json'] = () => {
  //           return (options && options['observe'] === 'response' ? res['body'] : res);
  //         };
  //       }
  //       return of(res);
  //     }),
  //     catchError((error: any) => {
  //       error['text'] = () => {
  //         return error['error'];
  //       };
  //       return throwError(error);
  //     })
  //   );
  // }

  // public bearerHeader() {
  //   return 'Bearer ' + this.appLocalStorage.getTokenInfo().access_token;
  // }

  // uploadFile(file: any, url: string, data?: any): Promise<any> {
  //   return new Promise((resolve, reject) => {

  //     const xhr: XMLHttpRequest = new XMLHttpRequest();
  //     xhr.onreadystatechange = () => {
  //       if (xhr.readyState === 4) {
  //         if (xhr.status === 200) {
  //           resolve(<any>xhr.response);
  //         } else {
  //           reject(xhr.response);
  //         }
  //       }
  //     };
  //     xhr.open('POST', this.apiHostName + url, true);

  //     const formData = new FormData();
  //     if ($.isArray(file)) {
  //       for (let i = 0; i < file.length; i++) {
  //         formData.append('file' + (i + 1), file[i]);
  //       }
  //     } else {
  //       formData.append('file', file);
  //     }
  //     if (data) {
  //       formData.append('data', JSON.stringify(data));
  //     }
  //     xhr.setRequestHeader('Authorization', this.bearerHeader());
  //     xhr.send(formData);
  //   });
  // }
}
