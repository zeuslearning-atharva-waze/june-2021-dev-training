import { Component, OnInit } from '@angular/core';
import { WalkinService } from '../../../app/walkinz.service';
import { Datetime, Venue } from '../interfaces/WalkinApply';
import { ThingsToRemember } from '../interfaces/WalkinDetails';
@Component({
  selector: 'app-walkin-hall-ticket',
  templateUrl: './walkin-hall-ticket.component.html',
  styleUrls: ['./walkin-hall-ticket.component.scss'],
})
export class WalkinHallTicketComponent implements OnInit {
  data: any;
  datetime: Datetime;
  venue: Venue;
  tor: ThingsToRemember;
  constructor(private walkinService: WalkinService) {}

  ngOnInit(): void {
    this.data = this.walkinService.getappData();
    this.datetime = this.data[0][0];
    this.venue = this.data[1][0];
    this.tor = this.data[2][0];
  }
}
