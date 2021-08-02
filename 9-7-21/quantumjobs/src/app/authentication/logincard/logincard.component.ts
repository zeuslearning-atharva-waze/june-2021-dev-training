import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../app/user.service';

@Component({
  selector: 'app-logincard',
  templateUrl: './logincard.component.html',
  styleUrls: ['./logincard.component.scss'],
})
export class LogincardComponent implements OnInit {
  creds: any;
  loginForm = new FormGroup({
    userLogin: new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    }),
  });
  userLogin = this.loginForm.get('userLogin') as FormGroup;
  constructor(
    private userService: UserService,

    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.creds = {
      email: this.userLogin.get('email')?.value,
      password: this.userLogin.get('password')?.value,
    };
    console.log(this.creds);
    this.userService.login(this.creds).subscribe((res: any) => {
      if (res.token) {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('jwt', JSON.stringify(res.token));
        this.router.navigate(['/walkins']);
      }
    });
  }
}
