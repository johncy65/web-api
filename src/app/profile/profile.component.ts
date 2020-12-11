import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ProfileUpdateComponent } from "../profile-update/profile-update.component";
import { AuthService } from "../auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  firstName:string;
  secondName:string;
  email:string;

  constructor(public dialog: MatDialog,public authService: AuthService, private sb:MatSnackBar) {}

  ngOnInit(): void {
    this.authService.getProfileDetails()
    .subscribe((data) =>{
      this.firstName = data['data']['firstName'];
      this.secondName = data['data']['secondName'];
      this.email = data['data']['email'];
    });
  }

  openDialog(value):void{
    const dialogRef = this.dialog.open(ProfileUpdateComponent,{
      width:'500px',
      data:{
        type:value,
        firstName:this.firstName,
        secondName:this.secondName,
        email:this.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       if(result.type == 'profile'){
          this.firstName = result.firstName;
          this.secondName = result.secondName;
          this.email = result.email;
          this.sb.open('Profile updated successfully', 'OK');
       }else{
         this.sb.open('Password changed successfully', 'OK');
       }
      }
    });
  }
}

