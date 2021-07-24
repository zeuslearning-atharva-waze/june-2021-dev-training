import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { WalkinService } from '../../../app/walkinz.service';
import {
  Walkin,
  Location,
  WalkinRoleMap,
  JobRole,
  Internship,
} from '../interfaces/Walkins';
@Component({
  selector: 'app-basewalkin',
  templateUrl: './basewalkin.component.html',
  styleUrls: ['./basewalkin.component.scss'],
})
export class BasewalkinComponent implements OnInit {
  walkins: [Walkin];
  locations: [Location];
  walkinrolemap: [WalkinRoleMap];
  jobroles: [JobRole];
  walkininternship: [Internship];
  constructor(private walkinService: WalkinService) {}

  ngOnInit(): void {
    this.walkinService.walkins().subscribe((res: any) => {
      this.walkins = res[0];
      this.locations = res[1];
      this.walkinrolemap = res[2];
      this.jobroles = res[3];
      this.walkininternship = res[4];

      this.walkinrolemap.forEach((wr: WalkinRoleMap) => {
        this.jobroles.forEach((job: JobRole) => {
          if (wr.role_id === job.role_id) wr.title = job.title;
        });
      });
      //console.log(this.walkinrolemap);

      this.walkins.forEach((element: Walkin) => {
        this.locations.forEach((location: Location) => {
          if (location.walk_in_id === element.walk_in_id)
            element.location = location.city;
        });

        element.jobroles = [];
        this.walkinrolemap.forEach((wr: WalkinRoleMap) => {
          if (wr.walk_in_id === element.walk_in_id)
            element.jobroles.push(wr.title);
        });
        this.walkininternship.forEach((wi: Internship) => {
          if (wi.walk_in_id === element.walk_in_id)
            element.internship = wi.degree;
        });
      });
    });

    // axios
    //   .get('http://localhost:5000/walkins')
    //   .then((res) => {
    //     this.walkins = res.data[0];
    //     this.locations = res.data[1];
    //     this.walkinrolemap = res.data[2];
    //     this.jobroles = res.data[3];
    //     this.walkininternship = res.data[4];

    //     this.walkinrolemap.forEach((wr: any) => {
    //       this.jobroles.forEach((job: any) => {
    //         if (wr.role_id === job.role_id) wr.title = job.title;
    //       });
    //     });
    //     //console.log(this.walkinrolemap);

    //     this.walkins.forEach((element: any) => {
    //       this.locations.forEach((location: any) => {
    //         if (location.walk_in_id === element.walk_in_id)
    //           element.location = location.city;
    //       });
    //       element.jobroles = [];
    //       this.walkinrolemap.forEach((wr: any) => {
    //         if (wr.walk_in_id === element.walk_in_id)
    //           element.jobroles.push(wr.title);
    //       });
    //       this.walkininternship.forEach((wi: any) => {
    //         if (wi.walk_in_id === element.walk_in_id)
    //           element.internship = wi.degree;
    //       });
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }
}
