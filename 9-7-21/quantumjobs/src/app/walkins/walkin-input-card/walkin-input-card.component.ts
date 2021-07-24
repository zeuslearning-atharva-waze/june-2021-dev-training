import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { WalkinService } from '../../../app/walkinz.service';

@Component({
  selector: 'app-walkin-input-card',
  templateUrl: './walkin-input-card.component.html',
  styleUrls: ['./walkin-input-card.component.scss'],
})
export class WalkinInputCardComponent implements OnInit {
  @Input() guid: any;
  slots: any;
  walkinrolemap: any;

  jobroles: any;
  radio: any;
  url: any;
  image: any;
  Tech = new FormArray([]);
  jobids: string = '';
  finale: any = {};
  userid: any;
  constructor(private walkinService: WalkinService) {}

  ngOnInit(): void {
    this.walkinService.getWalkin(this.guid).subscribe((res: any) => {
      //console.log(res);
      this.slots = res[4];
      //console.log(this.slots);
      this.walkinrolemap = res[1];
      this.jobroles = res[3];
      this.walkinrolemap.forEach((wr: any) => {
        this.jobroles.forEach((job: any) => {
          if (wr.role_id === job.role_id) wr.title = job.title;
        });
      });

      console.log(this.walkinrolemap);
    });
  }

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.Tech.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.Tech.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.Tech.removeAt(i);
          return;
        }
        i++;
      });
      this.jobids = '';
    }
    //console.log(this.Tech.value);

    //console.log(this.jobids);
    //str = str.replace(/,\s*$/, "");
  }

  apply(event: any) {
    this.image = event.target.files[0];
    // let user: any = localStorage.getItem('user');
    // let userid = JSON.parse(user);
    // this.userid = userid.user.id;
    // this.Tech.value.forEach((element: any) => {
    //   this.jobids += `${element},`;
    // });
    // this.jobids = this.jobids.replace(/,\s*$/, '');
    // console.log(this.jobids);
    // console.log(this.radio);
    // console.log(this.image);
    // const data = new FormData();
    // data.append('file', this.image);
    // data.append('upload_preset', 'connectx');
    // data.append('cloud_name', 'atharvaconnectx');
    // fetch('https://api.cloudinary.com/v1_1/atharvaconnectx/image/upload', {
    //   method: 'post',
    //   body: data,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.url = data.url;
    //     this.finale.guid = this.guid;
    //     this.finale.slot = this.radio;
    //     this.finale.resume = this.url;
    //     this.finale.jobids = this.jobids;
    //     this.finale.userid = this.userid;
    //     console.log(this.finale);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  finaldata() {
    const prom = new Promise((resolve, reject) => {
      let user: any = localStorage.getItem('user');
      let userid = JSON.parse(user);
      this.userid = userid.user.id;
      this.Tech.value.forEach((element: any) => {
        this.jobids += `${element},`;
      });
      this.jobids = this.jobids.replace(/,\s*$/, '');
      //console.log(this.jobids);
      //console.log(this.radio);
      //console.log(this.image);
      const data = new FormData();
      data.append('file', this.image);
      data.append('upload_preset', 'connectx');
      data.append('cloud_name', 'atharvaconnectx');
      fetch('https://api.cloudinary.com/v1_1/atharvaconnectx/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          this.url = data.url;
          this.finale.guid = this.guid;
          this.finale.slotid = parseInt(this.radio);
          this.finale.resumelink = this.url;
          this.finale.prefrences = this.jobids;
          this.finale.userid = this.userid;
          //console.log(this.finale);
          resolve(this.finale);
        })
        .catch((err) => {
          console.log(err);
        });

      (err: any) => {
        reject(err);
      };
    });

    return prom;
  }

  alert() {
    return this.finale;
  }
}
