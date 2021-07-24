import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../app/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  pic = this.userService.profilepic;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.pic);
  }
}
