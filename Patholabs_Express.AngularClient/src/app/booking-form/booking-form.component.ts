import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Appointment_details } from '../entity/Appointment_details';
import { serverResponse } from '../entity/common/response';
import { CommonService } from '../shared/service/common.service';


@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  successMessage:string="";
  bookForm!:FormGroup
  app_details: Appointment_details=new Appointment_details();
  testId!:number
  

  
  constructor(private fb:FormBuilder, private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.testId = params['testId'];
      console.log(this.testId);
    });
    this.bookForm=this.fb.group({
      CustomerName:["",[Validators.required]],
      //Email:["",Validators.required],
      DateofAppointment:["",Validators.required]


    })
  }


bookAppointment(){
  console.log(this.bookForm.value)
  this.SpinnerService.show();
  let details:any=this.bookForm.value;
  this.app_details.TestId=this.testId
  this.app_details.Email=this.common.getUserEmailFromLocalStorage();
  this.app_details.CreatorUserId=this.common.getUserIdFromLocalStorage();
  this.app_details.CustomerName=details.CustomerName;
  this.app_details.App_Date_Time= new Date( details.DateofAppointment);
  
  // Object.assign(this.loginDto, this.loginForm.value);
  //  this.loginDto.UserType = enUserType.Admin;
  this.common.addAppointment(this.app_details).subscribe((res: serverResponse) => {
    if (res.Success == true) {
      //add rounting
      this.SpinnerService.hide()
      window.alert("Appointment Booked Successfully!!")
      this.route.navigate(["/bookedappointment"])
      this.bookForm.setValue({CustomerName:"",DateofAppointment:""})
      
      
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

};


}