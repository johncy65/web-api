import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuardGuard} from "./auth-guard.guard";

const routes: Routes = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' }, 
  {path:'login', component:LoginComponent},
  {path:'profile', component:ProfileComponent,canActivate:[AuthGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
