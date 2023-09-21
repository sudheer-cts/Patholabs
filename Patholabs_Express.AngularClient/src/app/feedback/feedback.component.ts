import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverResponse } from '../entity/common/response';
import { FeedbackDto } from '../entity/Feedback';
import { Test_Details } from '../entity/Testdetails';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  isAdmin!:boolean;
  isLogin!:boolean;
  successMessage:string="";
  feedForm!:FormGroup
  feed: FeedbackDto=new FeedbackDto();
  appId!:number


  constructor(private fb:FormBuilder, private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute ) {}
  


  ngOnInit(): void {
    this.isAdmin=this.common.getIsadminFromLocalStorage()
    this.isLogin=this.common.getIsloginfromLocalStorage()
    this.activatedRoute.queryParams.subscribe(params => {
      this.appId = params['Id'];
      console.log(this.appId);
    });
    this.feedForm=this.fb.group({
      feedback:["",[Validators.required]]
      
      


    })
  }

  appFeed(){
    console.log(this.feedForm.value)
    this.SpinnerService.show();
    let details:any=this.feedForm.value;
    this.feed.Feedback=details.feedback;
    this.feed.AppointmentId=this.appId;
    
    
    // Object.assign(this.loginDto, this.loginForm.value);
    //  this.loginDto.UserType = enUserType.Admin;
    this.common.giveFeedback(this.feed).subscribe((res: serverResponse) => {
      if (res.Success == true) {
        //add rounting
        this.SpinnerService.hide()
        window.alert("Feedback Added Successfully!!")
        
        
        this.feedForm.setValue({feedback:""})
        this.route.navigate(["/bookedappointment"])
        
        
      }
      else{
        alert("Failed to post the Feedback");
      }
    },
      (err) => {
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
      });
  

    

}
}
