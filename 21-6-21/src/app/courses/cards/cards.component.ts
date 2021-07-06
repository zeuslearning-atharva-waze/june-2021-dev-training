import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/Card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  constructor() {
    fetch('../../../assets/card.json')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element: any) => {
          this.cards.push(element);
        });
      });
  }

  ngOnInit(): void {}
}
