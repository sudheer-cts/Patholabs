import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { serverResponse } from 'src/app/entity/common/response';
import { HttpHeaders } from '@angular/common/http';
const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})

export class CommonService {

  readonly serverBaseUrl = environment.server;
  readonly api = "api/";
  actionUrl!: string;
  constructor(private http: HttpClient) {
    this.actionUrl = this.serverBaseUrl + this.api;
  }

  public login(loginvalue: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl + 'Login';
    return this.http.post<serverResponse>(actionUrl, JSON.stringify(loginvalue), { 'headers': headers })
  }
 
  public storeIsadminToLocalStorage(isAdmin: boolean) {
    let admin: string = isAdmin ? "true" : "false";
    localStorage.setItem('isAdmin', admin);
  }
  public storeIsloginToLocalStorage(isAdmin: boolean) {
    let admin = isAdmin ? "true" : "false";
    localStorage.setItem('isLogin', admin);
  }

  public getIsadminFromLocalStorage():boolean {
    let str=localStorage.getItem("isAdmin");
    return (str =="true")?true:false;
    
  }
  public getIsloginfromLocalStorage():boolean {
    let str = localStorage.getItem("isLogin");
    return (str == "true") ? true : false;
    
  }
  public registeruser(user: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl + 'User';
    return this.http.post<serverResponse>(actionUrl, JSON.stringify(user), { 'headers': headers })
  }
  public getAllTestItem(): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'Test_Details' + '/Get';
    return this.http.get<serverResponse>(actionUrl,{ 'headers': headers })
  }

  public addTest(test: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl +'Test_Details'+ '/Login';
    return this.http.post<serverResponse>(actionUrl, JSON.stringify(test), { 'headers': headers })
  }

  public addAppointment(test: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl +"Appointment_Details";
    return this.http.post<serverResponse>(actionUrl, JSON.stringify(test), { 'headers': headers })
  }

  public storeUserIdToLocalStorage(UserId: string) {
    // let admin: string = isAdmin ? "true" : "false";
    localStorage.setItem('UserId', UserId);
  }
  public getUserIdFromLocalStorage(): number {
    let str = localStorage.getItem("UserId");
    return str?parseInt(str):0;

  }
  public storeUseremailToLocalStorage(Email: string) {
    // let admin: string = isAdmin ? "true" : "false";
    localStorage.setItem('UserEmailId', Email);
  }
  public getUserEmailFromLocalStorage(): string {
    let str = localStorage.getItem("UserEmailId");
    return str ? str : "";
  }

  public editTest(test: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl +"Test_Details";
    return this.http.put<serverResponse>(actionUrl, JSON.stringify(test), { 'headers': headers })
  }

  public getAllBookingById(id:any): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'Appointment_Details/' + id;
    return this.http.get<serverResponse>(actionUrl,{ 'headers': headers , })
  }

  public deleteById(id:any): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'Appointment_Details/Delete/' + id;
    return this.http.delete<serverResponse>(actionUrl,{ 'headers': headers , })
  }

  public getAllUserDetails(): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'User';
    return this.http.get<serverResponse>(actionUrl,{ 'headers': headers , })
  }

  public getAllAppointmentDetails(): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'Appointment_Details';
    return this.http.get<serverResponse>(actionUrl,{ 'headers': headers , })
  }

  public giveFeedback(feed: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl +"Feedback";
    return this.http.post<serverResponse>(actionUrl, JSON.stringify(feed), { 'headers': headers })
  }

  public raiseHelp(help: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl +"HelpDesk";
    return this.http.post<serverResponse>(actionUrl, JSON.stringify(help), { 'headers': headers })
  }

  public updateUserDetails(user: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl +"User";
    return this.http.put<serverResponse>(actionUrl, JSON.stringify(user), { 'headers': headers })
  }

  public updateAppointmentDetails(appointment: any): Observable<serverResponse> {
    let actionUrl = this.actionUrl +"Appointment_Details";
    return this.http.put<serverResponse>(actionUrl, JSON.stringify(appointment), { 'headers': headers })
  }

  public getAllSearchTest(search:any): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'Test_Details/SearchResult/'+search;
    return this.http.get<serverResponse>(actionUrl,{ 'headers': headers , })
  }

  public getAllSalesReport(fromdate:any,todate:any): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'Appointment_Details/GetReport/'+fromdate+"/"+todate;
    return this.http.get<serverResponse>(actionUrl,{ 'headers': headers  })
  }
  public getAllUserDetailsbyId(userId:any): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'User/'+userId;
    return this.http.get<serverResponse>(actionUrl,{ 'headers': headers , })
  }

  public getAllAppDetailbyId(appid:any): Observable<serverResponse> {
    let actionUrl = this.actionUrl+ 'Appointment_Details/GetAppointmentDetails/' + appid;
    return this.http.get<serverResponse>(actionUrl,{ 'headers': headers , })
  }

}
