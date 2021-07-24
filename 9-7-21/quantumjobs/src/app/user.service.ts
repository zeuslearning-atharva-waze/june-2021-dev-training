import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  profilepic: string;
  constructor() {}

  setpic(pic: string) {
    this.profilepic = pic;
  }
}

