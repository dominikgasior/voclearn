import { Injectable } from '@angular/core';
import { Email } from '../dtos/email';
import { Password } from '../dtos/password';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { FullName } from '../dtos/full-name';
import {
  LoginRequestContract,
  RegisterRequestContract,
} from '@voclearn/contracts';
import { AuthLocalStorage } from './auth.local-storage';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthorized: BehaviorSubject<boolean>;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authLocalStorage: AuthLocalStorage,
    private readonly cookieService: CookieService
  ) {
    this.isAuthorized = new BehaviorSubject<boolean>(
      this.authLocalStorage.hasAuthenticated()
    );
  }

  authenticate(email: Email, password: Password): Observable<void> {
    const body: LoginRequestContract = {
      email: email.toString(),
      password: password.toString(),
    };

    return this.httpClient.post<void>('/api/auth/login', body).pipe(
      tap(() => {
        this.authLocalStorage.setAuthenticated();

        this.isAuthorized.next(true);
      }),
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }

  register(
    email: Email,
    password: Password,
    fullName: FullName
  ): Observable<void> {
    const body: RegisterRequestContract = {
      email: email.toString(),
      password: password.toString(),
      firstName: fullName.getFirstName(),
      lastName: fullName.getLastName(),
    };

    return this.httpClient.post<void>('/api/auth/register', body).pipe(
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }

  logout(): void {
    this.authLocalStorage.removeAuthenticated();

    this.cookieService.delete('isAuthenticated', '/');

    this.isAuthorized.next(false);
  }
}
