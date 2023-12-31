import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverResponse } from '../entity/common/response';
import { LoginDto } from '../entity/login/LoginDto';
import { User_Admin } from '../entity/login/user_admin';
import { UserDto } from '../entity/Registration/registration';
import { enUserType } from '../shared/common/enums';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  successMessage: string = "";
  loginForm!: FormGroup;
  userLoginForm!: FormGroup;
  userDetails!: User_Admin;
  loginDto: LoginDto = new LoginDto();
  userDto: UserDto= new UserDto();
  
  constructor(private fb: FormBuilder,
    private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router) { }

  ngOnInit(): void {
    //this.loginForm = this.fb.group({
      //email: ['', [Validators.required, Validators.pattern("^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,5})+$")]],
      //password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@!_]{6,}")]]
    //})
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,5})+$")]],
      password: ['', [Validators.required, Validators.pattern("[A-Za-z0-9@!_]{6,}")]],
      usertype:['',Validators.required]
    })
  }

  userlogin(isAdmin: boolean) {
    
    // console.log(isAdmin)
    // console.log(this.loginForm.value);
    if (this.userLoginForm.value.usertype=="Admin") {
      this.SpinnerService.show();
      Object.assign(this.loginDto, this.userLoginForm.value);
       this.loginDto.UserType = enUserType.Admin;
      this.common.login(this.loginDto).subscribe((res: serverResponse) => {
        if (res.Success == true) {
          //add rounting
          this.userDto=res.Result;
          this.common.storeUserIdToLocalStorage(this.userDto.UserId.toString());
          this.common.storeUseremailToLocalStorage(this.userDto.Email);
          window.alert("Login successfully")
          this.route.navigate(["/viewappointment"])
          this.common.storeIsadminToLocalStorage(true)
          this.common.storeIsloginToLocalStorage(true)
        }
        else {
          this.SpinnerService.hide();
          window.alert("Login failed")
        }
      },
        (err) => {
          this.SpinnerService.hide();
        }, () => {
          this.SpinnerService.hide();
        });

    }
    else  {
      this.SpinnerService.show();
      Object.assign(this.loginDto,  this.userLoginForm.value );
       this.loginDto.UserType = enUserType.User;
      this.common.login(this.loginDto).subscribe((res: serverResponse) => {
        if (res.Success == true) {
          //add rounting
          this.userDto=res.Result;
          this.common.storeUserIdToLocalStorage(this.userDto.UserId.toString());
          this.common.storeUseremailToLocalStorage(this.userDto.Email);
          window.alert("Login successfully")
          this.route.navigate(["/viewtestandpricing"])
          this.common.storeIsadminToLocalStorage(false)
          this.common.storeIsloginToLocalStorage(true)
        }
        else {
          this.SpinnerService.hide();
          window.alert("Login failed")
        }
      },
        (err) => {
          this.SpinnerService.hide();
        }, () => {
          this.SpinnerService.hide();
        });
    }
  }
  adminlogin() {

  }


}