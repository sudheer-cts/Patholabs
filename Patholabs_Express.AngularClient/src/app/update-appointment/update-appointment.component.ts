import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Appointment_details } from '../entity/Appointment_details';
import { serverResponse } from '../entity/common/response';
import { UserDto } from '../entity/Registration/registration';
import { CommonService } from '../shared/service/common.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent implements OnInit {

  successMessage:string="";
  updateForm!:FormGroup
  app_details: Appointment_details=new Appointment_details();
  appId!:number;
  time:any;
  
  constructor(private fb:FormBuilder, private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private datepipe:DatePipe
     ) {}

    ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(params => {
      this.appId = params['Id'];
        console.log(this.appId);
      });
      
      this.updateForm=this.fb.group({
        CustomerName:["",[Validators.required]],
        DateofAppointment:["",Validators.required]
        
  
  
      })
      
      this.getAppDetails(this.appId)
    
      
    }
    UpdateAppointment(){
      console.log(this.updateForm.value)
        this.SpinnerService.show();
        let details:any=this.updateForm.value;
        this.app_details.AppointmentId=this.appId
        this.app_details.CustomerName=details.CustomerName;
        this.app_details.App_Date_Time= details.DateofAppointment;
        
        
        
        // Object.assign(this.loginDto, this.loginForm.value);
        //  this.loginDto.UserType = enUserType.Admin;
        this.common.updateAppointmentDetails(this.app_details).subscribe((res: serverResponse) => {
          if (res.Success == true) {
            //add rounting
            this.SpinnerService.hide()
            window.alert("Details Updated Successfully!!")

            
            this.updateForm.setValue({CustomerName:"",DateofAppointment:""})
            this.route.navigate(["/bookedappointment"])
            
            
          }
          else{
            alert("Failed to Update the appointment");
          }
        },
          (err) => {
            this.SpinnerService.hide();
          }, () => {
            this.SpinnerService.hide();
          });
    }

    getAppDetails(Id:any)
  {
    this.SpinnerService.show();
    this.common.getAllAppDetailbyId(Id).subscribe((res: serverResponse) => {
      if (res.Success == true) {
       console.log(res);
       this.app_details=res.Result;
       this.updateForm.setValue({CustomerName:this.app_details.CustomerName ,DateofAppointment: this.datepipe.transform(this.app_details.App_Date_Time, 'yyyy-MM-dd')});
       console.log(this.updateForm.value)
       

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
