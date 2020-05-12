import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { environment } from '@env/environment';

export interface LoginContext {
  login: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  AuthRoute = environment.serverUrl + '/auth/sign-in';

  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: any): Observable<Credentials> {
    // mocking the login functionality
    const data = {
      username: "hamza",
      token: "my-hanafi-custom-token",
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
    /*
    const infoUser: LoginContext = {
      login: context.username,
      password: context.password,
    };
    return this.http.post(this.AuthRoute, infoUser).pipe(
      map((response) => {
        const key = 'value';
        if (response[key]) {
          console.log('response', response);
          const data = {
            username: context.username,
            token: response[key],
          };
          this.credentialsService.setCredentials(data, context.remember);
          return data;
        }
      })
    );
    */
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
