import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /*
  Don't use canActivate guard for lazy loaded routes.
  Because that would mean that the code for the lazy loaded module gets downloaded before the guard actually executes
  and that means if we prevent the navigation due to this guard, we unnecessary download the code.
  So instead we should use canLoad which actually is a guard that runs before lazy loaded code is fetched.

  canLoad() will be used to decide whether to load this module. Executes only during module load
  */
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('AuthGuard - canLoad');
    if (!this.authService.userIsAuthenticated) {
      // if user is not authenticated, navigate the user to the Login page
      this.router.navigate(['/auth']);
    }
    return this.authService.userIsAuthenticated;
  }

  // canActivate() will be used to each time the page is accessed
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('AuthGuard - canActivate');
    if (!this.authService.userIsAuthenticated) {
      // if user is not authenticated, navigate the user to the Login page
      this.router.navigate(['/auth']);
    }
    return this.authService.userIsAuthenticated;
  }
}
