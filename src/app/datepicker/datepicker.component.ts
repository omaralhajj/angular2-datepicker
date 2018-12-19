import { Component, OnInit, Input } from '@angular/core';
import {
	startOfMonth,
	endOfMonth,
	eachDay,
	isToday,
	getDay,
	subDays,
	isThisMonth,
	addMonths,
	subMonths
} from 'date-fns';
import { DatepickerOptions } from '../models/datepicker-options';
import { Day } from '../models/day';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit {
	private internalDate;

	dayLabels = [
		'Sun',
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat'
	];

	@Input()
	public get date() {
		return this.internalDate;
	}
	public set date(value) {
		this.internalDate = value;
	}

	@Input() options = new DatepickerOptions();

	public calendar = new Array<Day>();
	public selectedDay: number;
	public buttonText = 'DEC 2018';
	public weekNumbers = ['1', '2', '3', '4', '5', '6'];

	constructor() { }

	ngOnInit() {
		this.update();
	}

	public update() {
		const start = startOfMonth(this.date);
		const end = endOfMonth(this.date);

		const prevMonth = [];
		for (let i = 1; i <= getDay(start); i++) {
			const date = subDays(start, i);
			prevMonth.push(new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: false
			}));
		}

		let currentMonth = [];
		currentMonth = eachDay(start, end).map((date) => {
			return new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: true
			});
		});
		this.calendar = prevMonth.concat(currentMonth);
	}

	public select(i: number) {
		// unselect
		if (this.selectedDay !== undefined) {
			this.calendar[this.selectedDay].isSelected = false;
		}
		this.calendar[i].isSelected = true;
		this.selectedDay = i;
	}

	public getCssClass(day: Day): string {
		if (day.isSelected) {
			return 'day selected';
		}

		if (day.isToday) {
			return 'day today';
		}

		if (!day.isThisMonth) {
			return 'day not-in-month';
		}

		return 'day';
	}

	close() {
		console.log('closing');
	}

	nextMonth() {
		this.date = addMonths(this.date, 1);
		this.update();
	}

	previousMonth() {
		this.date = subMonths(this.date, 1);
		this.update();
	}
}
