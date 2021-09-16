import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component'; 
const routes: Routes = [

  {
      path: 'signup', component: UserComponent,
      children: [{ path: '', component: SignupComponent }]
  },
  {
      path: '', redirectTo: '/signup', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
