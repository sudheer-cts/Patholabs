import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverResponse } from '../entity/common/response';
import { FeedbackDto } from '../entity/Feedback';
import { HelpDeskDto } from '../entity/HelpDesk';
import { Test_Details } from '../entity/Testdetails';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.css']
})
export class HelpDeskComponent implements OnInit {

  isAdmin!:boolean;
  isLogin!:boolean;
  successMessage:string="";
  helpForm!:FormGroup
  helpdata: HelpDeskDto=new HelpDeskDto();
  userId!:number


  constructor(private fb:FormBuilder, private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute ) {}


    ngOnInit(): void {
      this.isAdmin=this.common.getIsadminFromLocalStorage()
      this.isLogin=this.common.getIsloginfromLocalStorage()
      
      this.helpForm=this.fb.group({
      issue:["",[Validators.required]]
      
      


    })
    }
    Help(){
      console.log(this.helpForm.value)
      this.SpinnerService.show();
      let details:any=this.helpForm.value;
      this.helpdata.Issue=details.issue;
      this.helpdata.UserId=this.common.getUserIdFromLocalStorage();
      
      
      
      // Object.assign(this.loginDto, this.loginForm.value);
      //  this.loginDto.UserType = enUserType.Admin;
      this.common.raiseHelp(this.helpdata).subscribe((res: serverResponse) => {
        if (res.Success == true) {
          //add rounting
          this.SpinnerService.hide()
          window.alert("Issue Raised Successfully!!")
          
          
          this.helpForm.setValue({issue:""})
          this.route.navigate(["/home"])
          
          
        }
        else{
          alert("Failed to post the Issue");
        }
      },
        (err) => {
          this.SpinnerService.hide();
        }, () => {
          this.SpinnerService.hide();
        });
    

}
}
