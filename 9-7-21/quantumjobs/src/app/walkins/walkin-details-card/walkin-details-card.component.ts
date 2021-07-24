import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalkinService } from '../../../app/walkinz.service';
import { Instruction, Round, Slot } from '../interfaces/WalkinDetails';
import {
  Walkin,
  WalkinRoleMap,
  JobRole,
  Location,
} from '../interfaces/Walkins';
import { WalkinInputCardComponent } from '../walkin-input-card/walkin-input-card.component';
@Component({
  selector: 'app-walkin-details-card',
  templateUrl: './walkin-details-card.component.html',
  styleUrls: ['./walkin-details-card.component.scss'],
})
export class WalkinDetailsCardComponent implements OnInit {
  @Input() guid: string;
  @Input() second: WalkinInputCardComponent;
  walkin: Walkin;
  walkins: [Walkin];
  walkinroleMap: [WalkinRoleMap];
  jobroles: [JobRole];
  location: [Location];
  slots: [Slot];
  instructions: [Instruction];
  rounds: [Round];
  data: any;
  displayinst: any = {};
  preapptoggle: boolean = true;
  daaaaata: any;

  constructor(private walkinService: WalkinService, private router: Router) {}

  ngOnInit(): void {
    this.walkinService.getWalkin(this.guid).subscribe((res: any) => {
      //console.log(c);
      this.walkins = res[0];
      //console.log(res);

      this.walkinroleMap = res[1];
      //console.log(this.walkinroleMap);
      this.location = res[2];
      //console.log(this.location);
      this.jobroles = res[3];
      //console.log(this.jobroles);
      this.slots = res[4];
      //console.log(this.slots);
      this.instructions = res[5];
      //console.log(this.instructions);
      this.rounds = res[6];
      //console.log(this.rounds);
      this.walkinroleMap.forEach((wr: WalkinRoleMap) => {
        this.jobroles.forEach((job: JobRole) => {
          if (wr.role_id === job.role_id) wr.title = job.title;
        });
      });
      this.walkins.forEach((element: Walkin) => {
        this.location.forEach((location: Location) => {
          if (location.walk_in_id === element.walk_in_id)
            element.location = location.city;
        });
        element.jobroles = [];
        this.walkinroleMap.forEach((wr: WalkinRoleMap) => {
          if (wr.walk_in_id === element.walk_in_id)
            element.jobroles.push(wr.title);
        });
      });
      this.walkin = this.walkins[0];
      this.instructions.forEach((element: Instruction) => {
        if (element.instruction_text === 'General')
          this.displayinst.general = element.instruction;
        if (element.instruction_text === 'Exam')
          this.displayinst.exam = element.instruction;
        if (element.instruction_text === 'System')
          this.displayinst.system = element.instruction;
        if (element.instruction_text === 'Process')
          this.displayinst.process = element.instruction;
      });
      let round: Round = this.rounds[0];
      this.displayinst.process =
        this.displayinst.process + '<br /><br />' + round.round_detail;
    });
  }

  pretoggle() {
    this.preapptoggle = !this.preapptoggle;
  }

  submitForm() {
    this.second.finaldata().then((fin: any) => {
      this.walkinService.postapplication(fin).subscribe((res: any) => {
        if (res.length > 0) {
          this.walkinService.saveapplicationdata(res);
          let routestring = `walkin/${fin.guid}/apply/success`;
          this.router.navigate([routestring]);
        }
      });
    });
  }
}
