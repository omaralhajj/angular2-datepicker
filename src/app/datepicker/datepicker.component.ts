import { Component, OnInit } from '@angular/core';
import { CurrentView } from '../models/enums';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit {
	public currentView = 'month';
	date = new Date();
	constructor() { }

	ngOnInit() {
	}

	changeView(view: string): void {
		this.currentView = view;
	}
}
