import { Component, Input, OnInit } from '@angular/core';
import { WalkinService } from '../../../app/walkinz.service';

@Component({
  selector: 'app-walkin-job-card',
  templateUrl: './walkin-job-card.component.html',
  styleUrls: ['./walkin-job-card.component.scss'],
})
export class WalkinJobCardComponent implements OnInit {
  @Input() guid: string | null;
  walkinrolemap: any;
  togglers: any = {};
  jobroles: any;
  jobtoggle: boolean = false;
  constructor(private walkinService: WalkinService) {}

  ngOnInit(): void {
    this.walkinService.getWalkin(this.guid).subscribe((res: any) => {
      //console.log(res);

      this.walkinrolemap = res[1];
      this.jobroles = res[3];
      this.walkinrolemap.forEach((wr: any) => {
        this.jobroles.forEach((job: any) => {
          if (wr.role_id === job.role_id) {
            wr.title = job.title;

            wr.description = job.description;
            wr.requirements = job.requirements;
            wr.compensation = job.compensation;
          }
        });
      });

      this.jobroles.forEach((job: any) => {
        this.togglers[`${job.title}`] = false;
      });
    });
  }

  toggler(e: any) {
    this.jobroles = e.target.id;
    this.togglers[this.jobroles] = !this.togglers[this.jobroles];
    console.log(this.togglers);
  }

  toggle() {
    console.log(this.togglers[this.jobroles]);
    return this.togglers[this.jobroles];
  }
}
