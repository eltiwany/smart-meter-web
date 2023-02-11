import { AuthGuardService } from './../../services/guards/auth-guard.service';
import { GuestGuardService } from './../../services/guards/guest-guard.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
