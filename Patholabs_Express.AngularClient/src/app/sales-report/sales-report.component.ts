import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { serverResponse } from '../entity/common/response';
import { SalesReportDto } from '../entity/SalesReportDto';
import { Test_Details } from '../entity/Testdetails';
import { CommonService } from '../shared/service/common.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {



  testDetail: Test_Details[]=[];
  salesDto: SalesReportDto=new SalesReportDto();
  isAdmin!:Boolean;
  isLogin!:Boolean;
  total:number=0;

  constructor(private common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private route:Router) { }

    ngOnInit(): void {
    
      this.isAdmin=this.common.getIsadminFromLocalStorage();
      this.isLogin=this.common.getIsloginfromLocalStorage();
      //this.getAllTestDetails();
    }

  SalesReport(){

    if(this.Validate()){
    this.SpinnerService.show();
    this.common.getAllSalesReport(this.salesDto.fromdate,this.salesDto.todate).subscribe((res: serverResponse) => {
      if (res.Success == true) {
        this.testDetail=[];
        this.total=0;
       this.testDetail=res.Result;
       for(let i:any=0;i<this.testDetail.length;i++){
         this.total=this.total+this.testDetail[i].TestPrice;
       }
      }
      else {
        this.SpinnerService.hide();
      }
    },
      (err) => {
        this.SpinnerService.hide();
      }, () => {
        this.SpinnerService.hide();
      });}
  }

  Validate():boolean{
    if(this.salesDto.fromdate>this.salesDto.todate){
      alert("Todate should be greater than from date")
      return false
    }
    if(this.salesDto.fromdate==null || this.salesDto.fromdate==undefined){
      alert("Please select From Date")
      return false
    }
    if(this.salesDto.todate==null || this.salesDto.todate==undefined){
      alert("Please select To Date")
      return false
    }
    return true
  }
}



