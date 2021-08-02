import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = 'http://localhost:5000/';
  UAPI_URL: string = 'http://localhost:5001/';
  profilepic: string = '../../../assets/icons/dprofile.png';
  isfresher: boolean = true;
  step: number = 1;
  jobs: any;
  techstack: any;

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  setpic(pic: string) {
    this.profilepic = pic;
  }

  getoptions() {
    return this.http.get(this.UAPI_URL + 'user/options');
  }
  register(val: any) {
    console.log(val);
    return this.http
      .post(this.UAPI_URL + 'user/register', val, this.httpHeader)
      .pipe(catchError(this.handleError));
  }

  login(creds: any): any {
    return this.http
      .post(this.UAPI_URL + 'user/login', creds)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

// {
//   "userDetails":{
//   "fname":"Smita",
//   "lname":"Waze",
//   "email":"smita@gmail.com",
//   "password":"smita12",
//   "phone":"91-9930993275",
//   "resumelink":"smita.com",
//   "portfolio":"smita.com",
//   "referral":"Atharva",
//   "jobupdates":true,
//   "profilepic":"smitapic",
//   "prefrences":"1,2",
//   "utype":"fresher"
//   },
//   "qualifications":{
//       "aggpercent":90,
//       "yearofpassing":"2019",
//       "degree":"btech",
//       "stream":"engineering",
//       "college":"bvcoe",
//       "collegeloc":"Mumbai",

//   },
//   "fresher":{
//       "prevapprole":"",
//       "freshertechpref":"1,2",
//       "othertech":""
//   },
//   "experienced":{
//       "yearsofex":2,
//       "currctc":400000,
//       "expectc":500000,
//       "noticeperiodend":"28/8/2021",
//       "noticeperiodduration":1,
//       "prevapplicationrole":"",
//       "otherextech":"",
//       "otherfamtech":"",
//       "expertpref":"1,2",
//       "fampref":"3,4"
//   }

// }
