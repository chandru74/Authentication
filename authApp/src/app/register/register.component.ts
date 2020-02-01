import { AuthserviceService } from './../authservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};
  constructor(private _auth: AuthserviceService,  private _router: Router) { }

  ngOnInit() {
  }

  registerData(){
    this._auth.registerService(this.registerUserData).subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/special']);
      }
    )
    }

}
