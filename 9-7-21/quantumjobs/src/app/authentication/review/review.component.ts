import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../app/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @Input() jobs: any;
  @Input() techstack: any;
  pic = this.userService.profilepic;
  isfresher = this.userService.isfresher;
  @Output() sedit: EventEmitter<number> = new EventEmitter();
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.pic);
  }

  edit(edit: string) {
    if (edit === 'PI') this.sedit.emit(1);
    if (edit === 'Q') this.sedit.emit(2);
  }
}
