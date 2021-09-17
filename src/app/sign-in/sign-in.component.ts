import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private router:Router) { }

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string="";
  model={
    email:'',
    password:''
  }


  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res:any) => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userProfile');
      },
      err => {
        if (err.status === 422) {
          (this.serverErrorMessages = err.error.join('<br/>'),4000);
          
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  


}
