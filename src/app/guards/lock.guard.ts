import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LockGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.user$.pipe(
      map((user) => {
        const isUserSignedIn = !!user;
        let condition = isUserSignedIn;
        if (isUserSignedIn) {
          condition = condition && !user.locked;
          if (!condition) {
            this.snackBar.open(
              `Tu usuario ha sido bloqueado, contacta con el administrador`,
              'Ok',
              {
                duration: 6000,
              }
            );
            this.auth.signOut();
          }
        }
        return condition;
      }),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
