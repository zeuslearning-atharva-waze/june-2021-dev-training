import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { WalkinService } from '../../../app/walkinz.service';
import { Slot } from '../interfaces/WalkinDetails';
import {
  JobRole,
  Location,
  Walkin,
  WalkinRoleMap,
} from '../interfaces/Walkins';
import { WalkinInputCardComponent } from '../walkin-input-card/walkin-input-card.component';
@Component({
  selector: 'app-walkin-detail',
  templateUrl: './walkin-detail.component.html',
  styleUrls: ['./walkin-detail.component.scss'],
})
export class WalkinDetailComponent implements OnInit {
  guid: string;
  constructor(
    private walkinService: WalkinService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.guid = params.get('id') as string;
    });
  }
}

// ngOnInit(): void {
//   this.route.paramMap.subscribe((params) => {
//     this.guid = params.get('id');
//   });
//   // let api_url = 'http://localhost:5000/walkin/' + this.guid;
//   // axios
//   //   .get(api_url)
//   //   .then((res) => {
// this.walkin = res.data[0];
// this.walkinroleMap = res.data[1];
// this.location = res.data[2];
// this.jobroles = res.data[3];
// this.slots = res.data[4];
// this.instructions = res.data[5];
// this.rounds = res.data[6];

// this.walkinroleMap.forEach((wr: any) => {
//   this.jobroles.forEach((job: any) => {
//     if (wr.role_id === job.role_id) wr.title = job.title;
//   });
// });
// this.walkin.forEach((element: any) => {
//   this.location.forEach((location: any) => {
//     if (location.walk_in_id === element.walk_in_id)
//       element.location = location.city;
//   });
//   element.jobroles = [];
//   this.walkinroleMap.forEach((wr: any) => {
//     if (wr.walk_in_id === element.walk_in_id)
//       element.jobroles.push(wr.title);
//   });
// });

//   //     this.walkin = this.walkin[0];
//   //   })
//   //   .catch((err) => console.error(err));

// }
