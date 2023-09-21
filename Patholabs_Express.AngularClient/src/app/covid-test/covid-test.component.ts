import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Appointment_details } from '../entity/Appointment_details';
import { serverResponse } from '../entity/common/response';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-covid-test',
  templateUrl: './covid-test.component.html',
  styleUrls: ['./covid-test.component.css']
})
export class CovidTestComponent implements OnInit {

  successMessage:string="";
  bookForm!:FormGroup
  isAdmin!:Boolean;
  isLogin!:Boolean;
  testId!:number
  
  constructor(private fb:FormBuilder, private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute ) {}


  
    ngOnInit(): void {
      this.testId=24;
      this.isAdmin=this.common.getIsadminFromLocalStorage();
      this.isLogin=this.common.getIsloginfromLocalStorage();
      
  
      
    }

  bookTest(){
    
   this.route.navigate(["/bookingappointment"],{queryParams:{testId:this.testId}})

    

  }
}
