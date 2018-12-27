import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit {
	date = new Date();
	constructor() { }

	ngOnInit() {
	}
}
