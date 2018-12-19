import { Component, OnInit, Input } from '@angular/core';
import {
	startOfMonth,
	endOfMonth,
	eachDay,
	isToday,
	getDay,
	subDays,
	addMonths,
	subMonths,
	getDayOfYear,
	startOfYear,
	addWeeks
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
	public weekNumbers = new Array<string>();

	constructor() { }

	ngOnInit() {
		this.update();
	}

	public update(): void {
		this.weekNumbers.length = 0;

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
		prevMonth.reverse();

		let currentMonth = [];
		currentMonth = eachDay(start, end).map((date) => {
			return new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: true
			});
		});

		this.calendar = prevMonth.concat(currentMonth);

		for (let i = 0; i < (this.calendar.length / 7); i++) {
			const week = addWeeks(start, i);
			this.weekNumbers.push(this.getWeekNumber(week));
		}

	}

	public select(i: number): void {
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

	close(): void {
		console.log('closing');
	}

	nextMonth(): void {
		this.date = addMonths(this.date, 1);
		this.update();
	}

	previousMonth(): void {
		this.date = subMonths(this.date, 1);
		this.update();
	}

	getWeekNumber(date: Date): string {
		const dayOfYear = getDayOfYear(date);
		const dayOfWeek = getDay(date);
		const dayOfWeekJanFirst = getDay(startOfYear(date));
		let weekNumber = ((dayOfYear + 6) / 7);
		if (dayOfWeek < dayOfWeekJanFirst) {
			weekNumber += 1;
		}
		console.log(weekNumber);
		return weekNumber.toFixed(0);
	}
}
