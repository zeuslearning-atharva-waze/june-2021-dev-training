import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import axios from 'axios';

import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WalkinService {
  jobstring: string;
  slottime: number;
  API_URL: string = 'http://localhost:5000/';
  appdata: any;
  constructor(private http: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  walkins() {
    return this.http.get(this.API_URL + 'walkins');
  }
  getWalkin(walkinId: string | null) {
    const test = `${this.API_URL + 'walkin'}/${walkinId}`;
    console.log(test);
    return this.http.get(`${this.API_URL + 'walkin'}/${walkinId}`);
  }

  login(creds: any): any {
    return this.http
      .post(this.API_URL + 'user/login', creds, this.httpHeader)
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

  getValues(jobs: string, slot: number) {
    this.jobstring = jobs;
    this.slottime = slot;
    console.log(this.jobstring);
    console.log(this.slottime);
  }

  postapplication(postval: any): any {
    return this.http
      .post(this.API_URL + 'walkin/apply', postval, this.httpHeader)
      .pipe(retry(1), catchError(this.handleError));
  }

  saveapplicationdata(res: any) {
    this.appdata = res;
  }

  getappData() {
    return this.appdata;
  }
}
