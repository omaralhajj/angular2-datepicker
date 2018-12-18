import { Component, OnInit } from '@angular/core';
import { IDatepickerOptions } from './interfaces/datepicker-options';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit {

  public options: IDatepickerOptions = {
    showTodayButton: true
  };

  constructor() { }

  ngOnInit() {
    console.log(this.options);
  }

}
