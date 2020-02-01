import { AuthGuard } from './auth.guard';
import { SpecialComponent } from './special/special.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';


const routes: Routes = [
  {path:'', redirectTo:'/events', pathMatch: 'full'},
  {path:'register', component: RegisterComponent},
  {path:'login',component: LoginComponent},
  {path:'events', component: EventsComponent},
  {path:'special', component: SpecialComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
