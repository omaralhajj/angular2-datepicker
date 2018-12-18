import { Component, OnInit } from '@angular/core';
import {
	startOfMonth,
	endOfMonth,
	eachDay,
	isToday
} from 'date-fns';
import { DatepickerOptions } from '../models/datepicker-options';
import { Day } from '../models/day';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit {
	public currentMonth = new Array<Day>();
	// Index of currently selected date
	public selectedDay: number;
	public weekNumbers = ['1', '2', '3', '4', '5', '6'];

	public options = new DatepickerOptions({
		enableDateRange: true
	});

	constructor() { }

	ngOnInit() {
		this.update();
	}

	public update() {
		// start and end should be for input date
		const today = new Date();
		console.log(today);
		const start = startOfMonth(new Date());
		const end = endOfMonth(new Date());
		this.currentMonth = eachDay(start, end).map((date) => {
			return new Day({
				date: date,
				isToday: isToday(date)
			});
		});
	}

	public select(i: number) {
		// unselect
		if (this.selectedDay !== undefined) {
			this.currentMonth[this.selectedDay].isSelected = false;
		}
		this.currentMonth[i].isSelected = true;
		this.selectedDay = i;
	}

	public getClass(day: Day): string {
		if (day.isSelected) {
			return 'day selected';
		}

		if (day.isToday) {
			return 'day today';
		}

		return 'day';
	}
}
