import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ng-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  value: number;

  constructor() { }

  ngOnInit() {
    this.value = 265;
  }

}
