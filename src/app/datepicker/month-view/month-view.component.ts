import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { Day } from '../../models/day';
import { Month, CurrentView } from 'src/app/models/enums';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
	selector: 'app-month-view',
	templateUrl: './month-view.component.html',
	styleUrls: ['./month-view.component.less']
})
export class MonthViewComponent extends BaseViewComponent implements OnInit {
	private internalDate: Date;

	public weekDayLabels: Array<string>;
	public weekNumbers = new Array<number>();
	public calendar = new Array<Day>();
	public selectedDate: Date;
	public buttonText: string;

	@Input()
	public get date() {
		return this.internalDate;
	}
	public set date(value) {
		this.internalDate = value;
	}

	@Input() options: DatepickerOptions;
	@Input() selectedDayId: string;

	@Output() dateSelected = new EventEmitter();
	@Output() buttonClick = new EventEmitter();

	constructor() {
		super();
	}

	ngOnInit() {
		this.weekDayLabels = this.updateWeekLabelOrder();
		this.update();
	}

	update(): void {
		this.weekNumbers.length = 0;
		this.calendar.length = 0;
		this.setButtonText();

		const start = startOfMonth(this.date);
		const end = endOfMonth(this.date);

		const prevMonth = [];
		const prevMonthLimit = getDay(start) - this.options.startDayOfWeek;
		for (let i = 1; i <= prevMonthLimit; i++) {
			const date = subDays(start, i);
			prevMonth.push(new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: false,
				id: getYear(date).toString() + getDayOfYear(date).toString(),
				day: date.getDate(),
				month: Month.Previous
			}));
		}
		prevMonth.reverse();

		const currentMonth = eachDay(start, end).map((date) => {
			return new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: true,
				id: getYear(date).toString() + getDayOfYear(date).toString(),
				day: date.getDate(),
				month: Month.Current
			});
		});

		const nextMonth = [];
		const nextMonthLimit = 7 - (getDay(end) - this.options.startDayOfWeek);
		for (let i = 1; i < nextMonthLimit; i++) {
			const date = addDays(end, i);
			nextMonth.push(new Day({
				date: date,
				isToday: isToday(date),
				isThisMonth: false,
				id: getYear(date).toString() + getDayOfYear(date).toString(),
				day: date.getDate(),
				month: Month.Next
			}));
		}

		this.calendar = prevMonth.concat(currentMonth).concat(nextMonth);

		this.selectDate(this.selectedDayId);

		for (let i = 0; i < (this.calendar.length / 7); i++) {
			const week = addWeeks(start, i);
			this.weekNumbers.push(this.getWeekNumber(week));
		}
	}

	selectDate(id: string): void {
		this.calendar.forEach((item) => {
				if (item.id === id) {
					item.isSelected = true;
					this.selectedDate = item.date;
					this.dateSelected.emit(id);
				} else {
					item.isSelected = false;
				}
			});
	}

	// Update week label order based on the start day of the week
	updateWeekLabelOrder(): Array<string> {
		const startDayOfWeek = this.options.startDayOfWeek;
		const weekLabels = Object.values(this.options.weekDayLabels);
		const arr1 = weekLabels.slice(0, startDayOfWeek);
		const arr2 = weekLabels.slice(startDayOfWeek);
		return arr2.concat(arr1);
	}

	nextMonth(): void {
		this.date = addMonths(this.date, 1);
		this.update();
	}

	previousMonth(): void {
		this.date = subMonths(this.date, 1);
		this.update();
	}

	getWeekNumber(date: Date): number {
		const dayOfYear = getDayOfYear(date);
		const dayOfWeek = getDay(date);
		const dayOfWeekJanFirst = getDay(startOfYear(date));
		let weekNumber = ((dayOfYear + 6) / 7);
		if (dayOfWeek < dayOfWeekJanFirst) {
			weekNumber += 1;
		}
		return Math.floor(weekNumber);
	}

	setButtonText(): void {
		const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		this.buttonText = `${months[this.date.getMonth()]} ${this.date.getFullYear()}`;
	}

	getCssClass(day: Day): string {
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
