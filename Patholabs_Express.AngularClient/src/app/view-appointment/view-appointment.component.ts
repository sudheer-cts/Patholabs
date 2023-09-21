import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { Appointment_details } from '../entity/Appointment_details';
import { serverResponse } from '../entity/common/response';
import { UserDto } from '../entity/Registration/registration';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  appointmentArray:Appointment_details[]=[]
  isAdmin!:boolean;
  isLogin!:boolean;
  
  constructor(private fb:FormBuilder, private comman: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute ) {}


  ngOnInit(): void {
    
    this.isAdmin=this.comman.getIsadminFromLocalStorage()
    this.isLogin=this.comman.getIsloginfromLocalStorage()
  
  
  
    this.getAllAppointment()
    
  }

  getAllAppointment(){
    this.comman.getAllAppointmentDetails().subscribe((res: serverResponse) => {
      if (res) {
        //add rounting
        this.SpinnerService.hide()
        this.appointmentArray=res.Result;
        //window.alert("Price edited Successfully!!")
        
      }
      else{
        this.appointmentArray=[]
        //alert("Failed to Booked the appointment");
      }
    },
      (err) => {
        this.appointmentArray=[]
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
      });
  }

}
