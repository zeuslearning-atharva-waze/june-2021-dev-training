import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../app/user.service';
@Component({
  selector: 'app-register-progress',
  templateUrl: './register-progress.component.html',
  styleUrls: ['./register-progress.component.scss'],
})
export class RegisterProgressComponent implements OnInit {
  @Input() data: number;
  @Output() step: EventEmitter<number> = new EventEmitter();
  constructor(private userService: UserService) {
    this.data = this.userService.step;
  }

  change(section: string) {
    if (section === 'PI') this.step.emit(1);
    if (section === 'Q') this.step.emit(2);
    if (section === 'RP') this.step.emit(3);
  }

  ngOnInit(): void {}
}
