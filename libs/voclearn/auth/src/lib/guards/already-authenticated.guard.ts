import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthStorage } from '../services/auth.storage';

@Injectable()
export class AlreadyAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authStorage: AuthStorage
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authStorage.hasAuthenticated()) {
      return false;
    }

    return true;
  }
}
