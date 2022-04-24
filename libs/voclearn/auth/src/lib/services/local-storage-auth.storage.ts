import { AuthStorage } from './auth.storage';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageAuthStorage implements AuthStorage {
  private static IS_AUTHENTICATED_KEY = 'is-authenticated';

  setAuthenticated(): void {
    localStorage.setItem(LocalStorageAuthStorage.IS_AUTHENTICATED_KEY, '1');
  }

  hasAuthenticated(): boolean {
    const isAuthenticated = localStorage.getItem(
      LocalStorageAuthStorage.IS_AUTHENTICATED_KEY
    );

    return isAuthenticated !== null;
  }
}
