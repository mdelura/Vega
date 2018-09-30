import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class AdminAuthGuardService extends AuthGuardService {

  constructor(auth: AuthService) {
    super(auth);
   }

  canActivate() {
    const isAuthenticated = super.canActivate();
    return isAuthenticated
       ? this.auth.isInRole('admin')
       : false;
  }
}
