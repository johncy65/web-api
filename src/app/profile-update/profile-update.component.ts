import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder,Validators } from '@angular/forms';
import { AuthService } from "../auth.service";



@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  hide = true;
  hide1 = true;
  hide2 = true;
  serverError = '';

  updateForm = this.fb.group({
    firstName:['', [Validators.required]],
    secondName:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    oldPassword:['', [Validators.required, Validators.minLength(8)]],
    newPassword:['', [Validators.required, Validators.minLength(8)]],
    confirmNewPassword:['', [Validators.required,Validators.minLength(8)]],
  });

  constructor(
    public dialogRef: MatDialogRef<ProfileUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,public auth:AuthService) {}

  ngOnInit(): void {
    this.updateForm.patchValue({
      firstName:this.data.firstName,
      secondName:this.data.secondName,
      email:this.data.email,
    });
  }

  saveProfile(){
    this.serverError = '';
    if(this.data.type == 'profile'){
      this.auth.saveProfile({
        firstName:this.firstName.value,
        secondName:this.secondName.value,
        email:this.email.value,
      }).subscribe((data) => {
        this.data.firstName = this.firstName.value;
        this.data.secondName = this.secondName.value;
        this.data.email = this.email.value;
        this.dialogRef.close(this.data);
      },(error) =>{
        this.serverError = error.error.message;
      });
    }else{
      this.auth.savePassword({
        oldPassword:this.oldPassword.value,
        newPassword:this.newPassword.value,
      }).subscribe(
        () => {this.dialogRef.close(this.data);},
        (error) => {this.serverError = error.error.message;}
      );
    }
  }

  isFormValid(){
    if(this.data.type === 'profile'){
      return this.firstName.invalid || this.secondName.invalid || this.email.invalid;
    }else{
      return this.oldPassword.invalid || this.newPassword.invalid || this.confirmNewPassword.invalid || !this.passwordDoesMatch
    }
  }

  get passwordDoesMatch(){
    return this.newPassword.value == this.confirmNewPassword.value;
  }


  get isProfile(){
    return this.data.type == 'profile';
  }

  get isPassword(){
    return this.data.type == 'password';
  }

   get firstName(){
    return this.updateForm.get('firstName');
  }

   get secondName(){
    return this.updateForm.get('secondName');
  }

   get email(){
    return this.updateForm.get('email');
  }

   get oldPassword(){
    return this.updateForm.get('oldPassword');
  }

   get newPassword(){
    return this.updateForm.get('newPassword');
  }

   get confirmNewPassword(){
    return this.updateForm.get('confirmNewPassword');
  }

}
