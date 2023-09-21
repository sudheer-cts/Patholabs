import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup,Validator, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverResponse } from '../entity/common/response';
import { Test_Details } from '../entity/Testdetails';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {

  successMessage:string="";
  editform!:FormGroup
  testId!:number
  testDetailsDto: Test_Details= new Test_Details();
  constructor(private fb:FormBuilder, private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route: Router,
    private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.testId = params['testId'];
      this.testDetailsDto.TestName=params['testName']
      console.log(this.testId);
    });
    this.editform=this.fb.group({
      
      TestPrice:["",Validators.required]
  })
 
}
editTest()
{

  console.log(this.editform.value)
  this.SpinnerService.show();
  let details:any=this.editform.value;
  this.testDetailsDto.TestId=this.testId
  this.testDetailsDto.TestPrice=details.TestPrice
  
  // Object.assign(this.loginDto, this.loginForm.value);
  //  this.loginDto.UserType = enUserType.Admin;
  this.common.editTest(this.testDetailsDto).subscribe((res: serverResponse) => {
    if (res.Success == true) {
      //add rounting
      this.SpinnerService.hide()
      window.alert("Price edited Successfully!!")
      this.editform.setValue({TestPrice:""})
      this.route.navigate(["/viewtest"])
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
bookTest()
{
  
}
}