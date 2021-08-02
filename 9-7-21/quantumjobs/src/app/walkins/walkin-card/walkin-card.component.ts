import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-walkin-card',
  templateUrl: './walkin-card.component.html',
  styleUrls: ['./walkin-card.component.scss'],
})
export class WalkinCardComponent implements OnInit {
  @Input() walkin: any;
  @Input() i: any;

  date: Date = new Date();
  expired: number | string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    //console.log(this.date);
    // console.log(new Date(this.walkin.startdate));

    let startdate = new Date(this.walkin.startdate);
    if (this.date > startdate) {
      this.expired = 'expired';
    } else if (startdate >= this.date) {
      var Time = startdate.getTime() - this.date.getTime();
      var Days = Time / (1000 * 3600 * 24);
      this.expired = Math.ceil(Days);
    }
  }

  getRouterLink(guid: any) {
    let token = localStorage.getItem('jwt');
    if (token) {
      this.router.navigate(['/walkin', guid]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
