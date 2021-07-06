import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  furtherEvent = false;
  constructor() {}

  ngOnInit(): void {}

  mOver(elem: string) {
    const element: any = document.querySelector(elem);

    console.log(element);
    element.classList.remove('gayab');
  }
  mOut(elem: string) {
    const element: any = document.querySelector(elem);
    const hoverdiv: any = document.querySelector(`${elem}hover`);
    //console.log(hoverdiv);
    hoverdiv.addEventListener(
      'mouseover',
      (e: Event) => {
        if (e) {
          this.furtherEvent = true;

          element.classList.remove('gayab');
          hoverdiv.addEventListener('mouseout', () => {
            element.classList.add('gayab');
            this.furtherEvent = false;
          });
        } else {
          element.classList.add('gayab');
          this.furtherEvent = false;
        }
      },
      false
    );
    //console.log(hoverdiv);
    setTimeout(() => {
      if (!this.furtherEvent) {
        element.classList.add('gayab');
        this.furtherEvent = false;
      }
    }, 100);

    //elemdiv.classList.add('gayab');
  }
}
