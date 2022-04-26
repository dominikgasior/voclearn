import { Injectable } from '@angular/core';

@Injectable()
export class AuthLocalStorage {
  private static IS_AUTHENTICATED_KEY = 'is-authenticated';

  setAuthenticated(): void {
    localStorage.setItem(AuthLocalStorage.IS_AUTHENTICATED_KEY, '1');
  }

  hasAuthenticated(): boolean {
    const isAuthenticated = localStorage.getItem(
      AuthLocalStorage.IS_AUTHENTICATED_KEY
    );

    return isAuthenticated !== null;
  }
}
