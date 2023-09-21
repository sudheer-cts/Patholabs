import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin!:boolean;
  isLogin!:boolean;
  constructor(private commonservice:CommonService,
    private SpinnerService: NgxSpinnerService,
    private route:Router) { }

  ngOnInit(): void {
    this.isAdmin=this.commonservice.getIsadminFromLocalStorage()
    this.isLogin=this.commonservice.getIsloginfromLocalStorage()
  }

  Logout(){
    this.SpinnerService.show()
    localStorage.clear();
    setTimeout(() => {
      this.route.navigate(["/home"]);
      this.SpinnerService.hide();
    }, 2000);

  }

}
