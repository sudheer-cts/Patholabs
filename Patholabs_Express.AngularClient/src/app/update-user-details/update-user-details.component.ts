import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Appointment_details } from '../entity/Appointment_details';
import { serverResponse } from '../entity/common/response';
import { UserDto } from '../entity/Registration/registration';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-update-user-details',
  templateUrl: './update-user-details.component.html',
  styleUrls: ['./update-user-details.component.css']
})
export class UpdateUserDetailsComponent implements OnInit {

  successMessage:string="";
  updateForm!:FormGroup
  user_details: UserDto=new UserDto();
  userId!:number

  
  constructor(private fb:FormBuilder, private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute ) {}

    ngOnInit(): void {

      let userId=this.common.getUserIdFromLocalStorage();

      console.log(userId);
      this.updateForm=this.fb.group({
        UserName:[""],
        UserEmail:[""],
        UserAge:["",[Validators.required,Validators.min(18), Validators.max(100)]],
        ContactofUser:["",[Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
        AddressofUser:["",[Validators.required]]
        
  
        
      })
      this.getUserDetails(userId);
    }
    UpdateUser(){

      
        console.log(this.updateForm.value)
        this.SpinnerService.show();
        let details:any=this.updateForm.value;
        this.user_details.UserId=this.common.getUserIdFromLocalStorage()
        this.user_details.Email=this.common.getUserEmailFromLocalStorage();
        this.user_details.Age=details.UserAge;
        this.user_details.Address=details.AddressofUser;
        this.user_details.Contact_No=details.ContactofUser;
        
        
        // Object.assign(this.loginDto, this.loginForm.value);
        //  this.loginDto.UserType = enUserType.Admin;
        this.common.updateUserDetails(this.user_details).subscribe((res: serverResponse) => {
          if (res.Success == true) {
            //add rounting
            this.SpinnerService.hide()
            window.alert("Details Updated Successfully!!")
            this.route.navigate(["/home"])
            //this.updateForm.setValue({UserAge:"",ContactofUser:"",AddressofUser:""})
            
            
          }
          else{
            alert("Failed to Booked the appointment");
          }
        },
          (err) => {
            this.SpinnerService.hide();
          }, () => {
            this.SpinnerService.hide();
          });

        
      
      
    }

    getUserDetails(userId:any)
  {
    this.SpinnerService.show();
    this.common.getAllUserDetailsbyId(userId).subscribe((res: serverResponse) => {
      if (res.Success == true) {
       console.log(res);
       this.user_details=res.Result;
       this.updateForm.setValue({UserName:this.user_details.Name,UserEmail:this.user_details.Email,UserAge:this.user_details.Age,ContactofUser:this.user_details.Contact_No,AddressofUser:this.user_details.Address});

      }
      else {
        this.SpinnerService.hide();
      }
    },
      (err) => {
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
      });
  }

}
