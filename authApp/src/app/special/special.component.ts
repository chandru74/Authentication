import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {

  special: any = [];
  constructor(private eventsService: EventsService, private _router:Router) { }

  ngOnInit() {
    this.eventsService.getSpecialEvents().subscribe(
      res => this.special = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status == 401){
            this._router.navigate(["/login"])
          }
        }
      }
    )
  }

}
