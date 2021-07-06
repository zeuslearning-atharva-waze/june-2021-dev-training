import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/Card';

@Component({
  selector: 'app-cocard',
  templateUrl: './cocard.component.html',
  styleUrls: ['./cocard.component.scss'],
})
export class CocardComponent implements OnInit {
  @Input() card: Card;
  constructor() {}

  ngOnInit(): void {}
}
