import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-progress',
  templateUrl: './register-progress.component.html',
  styleUrls: ['./register-progress.component.scss'],
})
export class RegisterProgressComponent implements OnInit {
  @Input() data: number;
  constructor() {
    this.data = 1;
  }

  ngOnInit(): void {}
}
