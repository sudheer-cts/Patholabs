import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Appointment_details } from '../entity/Appointment_details';
import { serverResponse } from '../entity/common/response';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-booked-appointment',
  templateUrl: './booked-appointment.component.html',
  styleUrls: ['./booked-appointment.component.css']
})
export class BookedAppointmentComponent implements OnInit {

  userId:any;
  appArray:Appointment_details[]=[]
  isAdmin!:boolean;
  isLogin!:boolean;

  constructor(private fb:FormBuilder, private comman: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.isAdmin=this.comman.getIsadminFromLocalStorage()
    this.isLogin=this.comman.getIsloginfromLocalStorage()

    this.userId=this.comman.getUserIdFromLocalStorage();
    this.bookedAppbyId()
  }

  bookedAppbyId(){
    
  this.comman.getAllBookingById(this.userId).subscribe((res: serverResponse) => {
    if (res) {
      //add rounting
      this.SpinnerService.hide()
      this.appArray=res.Result;
      
      
    }
    else{
      this.appArray=[]
      alert("Failed to Booked the appointment");
    }
  },
    (err) => {
      this.appArray=[]
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }

  delete(appId:any){
    this.comman.deleteById(appId).subscribe((res: serverResponse) => {
      if (res) {
        //add rounting
        this.SpinnerService.hide()
        //this.appArray=res.Result;
        window.alert("Appointment cancelled Successfully!!")
        
      }
      else{
        //this.appArray=[]
        alert("Failed to Booked the appointment");
      }
    },
      (err) => {
        //this.appArray=[]
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
        this.bookedAppbyId();
      });
  }

  giveFeed(appId:any){
    console.log(appId);
    this.route.navigate(["/feedback"],{queryParams:{Id:appId}})
  }

  updateAppointment(appId:any){
    console.log(appId)
    this.route.navigate(["/updateappointmentdetail"],{queryParams:{Id:appId}})
  }

  
}
