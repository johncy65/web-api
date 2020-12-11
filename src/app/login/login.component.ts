import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: 'login' | 'register' = 'register';
  hide1 = true;
  hide2 = true;
  authForm = this.fb.group({
    firstName:['', [Validators.required]],
    secondName:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]],
    confirmPassword:['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, public authService: AuthService,private router:Router) { }
  serverMessage:any;

  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      this.router.navigate(['profile']);
    }
  }

  changeValue(value): void {
    this.type = value;
  }

  isFormValid(){
    if(this.type === 'register'){
      return this.firstName.invalid || this.secondName.invalid || this.email.invalid || this.password.invalid || !this.passwordDoesMatch
    }else{
      return this.email.invalid || this.password.invalid;
    }
  }

  get isLogin():boolean {
    return this.type === 'login';
  }

  get isRegister():boolean {
    return this.type == 'register';
  }

  get firstName(){
    return this.authForm.get('firstName');
  }

   get secondName(){
    return this.authForm.get('secondName');
  }

   get email(){
    return this.authForm.get('email');
  }

   get password(){
    return this.authForm.get('password');
  }

   get confirmPassword(){
    return this.authForm.get('confirmPassword');
  }

  get passwordDoesMatch(){
    return this.password.value == this.confirmPassword.value;
  }

  onSubmit(): void{
    this.serverMessage = [];

    const firstName = this.authForm.get('firstName').value;
    const secondName = this.authForm.get('secondName').value;
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;

    if (this.type == 'register') {
      
      this.authService.register({
        firstName:firstName,
        secondName:secondName,
        email:email,
        password:password
      }).subscribe(() =>{
        this.router.navigate(['profile']);
      }, (error) =>{
        let em = error.error.message;
        if(Array.isArray(em)){
          this.serverMessage = em;
        }else{
          this.serverMessage = [{message:em}];
        }
      });

    }else{
      
      this.authService.login({
        email:email,
        password:password,
      }).subscribe(()=>{
         this.router.navigate(['profile']);
      },(error) =>{
        let em = error.error.message;
        if(Array.isArray(em)){
          this.serverMessage = em;
        }else{
          this.serverMessage = [{message:em}];
        }
      });

    }
  }
}
