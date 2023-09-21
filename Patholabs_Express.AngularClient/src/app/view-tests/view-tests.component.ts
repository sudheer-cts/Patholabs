import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverResponse } from '../entity/common/response';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-view-tests',
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.css']
})
export class ViewTestsComponent implements OnInit {
  isAdmin!:boolean;
  isLogin!:boolean;
  searchBoxtext!:string;
  

  constructor(private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route:Router) { }
  tests:any;
  ngOnInit(): void {
    
    this.isAdmin=this.common.getIsadminFromLocalStorage();
    this.isLogin=this.common.getIsloginfromLocalStorage();
    this.getAllTestDetails();
  }

  getAllTestDetails()
  {
    this.SpinnerService.show();
    this.common.getAllTestItem().subscribe((res: serverResponse) => {
      if (res.Success == true) {
       this.tests = res.Result;
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

  bookTest(Id:any){
   console.log(Id);
   this.route.navigate(["/bookingappointment"],{queryParams:{testId:Id}})

  }
  editTest(TestDetails:any, TestName:any){
    console.log(TestDetails);
    this.route.navigate(["/edittest"],{queryParams:{testId:TestDetails, testName:TestName}})
  }


  onclickSearch(searchBoxtext:string){
    if(searchBoxtext!=null && searchBoxtext!=undefined  && searchBoxtext.trim()!=""){
      let text= searchBoxtext.trim()
      this.SpinnerService.show();
      this.common.getAllSearchTest(text).subscribe((res: serverResponse) => {
      if (res.Success == true) {
       this.tests = res.Result;
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
  else{
    alert("Please enter valid text to search")
  }

}
}
