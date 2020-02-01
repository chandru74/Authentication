import { AuthserviceService } from './authservice.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{

  constructor(private _router: Router, private _authService: AuthserviceService){

  }

  canActivate(): boolean{
    if(this._authService.isLoggedIn()){
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }

  }
  
}
