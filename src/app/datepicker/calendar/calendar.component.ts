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
	addWeeks,
	getYear,
	addDays
} from 'date-fns';
import { DatepickerOptions } from '../../models/datepicker-options';
import { Day, Month } from '../../models/day';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {
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
	public selectedDateId: string;
	public buttonText: string;
	public weekNumbers = new Array<string>();
	public open = true;

	weekName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	constructor() { }

	ngOnInit() {
		this.date = new Date();
		this.update();
	}

	public update(): void {
		this.weekNumbers.length = 0;

		this.setButtonText();

		const start = startOfMonth(this.date);
		const end = endOfMonth(this.date);

		const prevMonth = [];
		for (let i = 1; i <= getDay(start); i++) {
			const date = subDays(start, i);
			prevMonth.push(new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: false,
				id: getYear(date).toString() + getDayOfYear(date).toString(),
				month: Month.Previous
			}));
		}
		prevMonth.reverse();

		const nextMonth = [];
		for (let i = 1; i < 7 - getDay(end); i++) {
			const date = addDays(end, i);
			nextMonth.push(new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: false,
				id: getYear(date).toString() + getDayOfYear(date).toString(),
				month: Month.Next
			}));
		}

		let currentMonth = [];
		currentMonth = eachDay(start, end).map((date) => {
			return new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: true,
				id: getYear(date).toString() + getDayOfYear(date).toString(),
				month: Month.Current
			});
		});

		this.calendar = prevMonth.concat(currentMonth).concat(nextMonth);

		this.select(this.selectedDateId);

		for (let i = 0; i < (this.calendar.length / 7); i++) {
			const week = addWeeks(start, i);
			this.weekNumbers.push(this.getWeekNumber(week));
		}
	}

	public select(id: string): void {
		this.calendar.forEach((item) => {
				if (item.id === id) {
					item.isSelected = true;
				} else {
					item.isSelected = false;
				}
			});
		this.selectedDateId = id;
	}

	close(): void {
		this.open = !this.open;
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
		return weekNumber.toFixed(0);
	}

	setButtonText() {
		const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		this.buttonText = `${months[this.date.getMonth()]} ${this.date.getFullYear()}`;
	}

	public getCssClass(day: Day): string {
		if (day.isSelected && day.isToday) {
			return 'day today-selected';
		}

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
}
