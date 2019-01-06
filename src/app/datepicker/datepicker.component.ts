import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatepickerOptions } from '../models/datepicker-options';
import { CurrentView } from '../models/enums';
import { datepickerAnimations } from './datepicker-animations';
import { isValid, getDayOfYear, getYear, getMonth } from 'date-fns';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.less'],
	animations: [
		datepickerAnimations.fadeInCalendar,
		datepickerAnimations.transformPanel
	]
})
export class DatepickerComponent implements OnInit {
	private _internalDate = new Date();
	private _selectedDate = new Date();

	public selectedMonthId: string;
	public selectedYearId: string;
	public selectedDayId: string;

	public get internalDate() {
		return this._internalDate;
	}
	public set internalDate(value) {
		this._internalDate = this.parse(value);
	}

	@Input()
	public get selectedDate() {
		return this._selectedDate;
	}
	public set selectedDate(value) {
		this._selectedDate = this.parse(value);
		this.change.emit(this._selectedDate);
	}

	@Input() options = new DatepickerOptions();
	@Input() currentView = 'month';

	@Output() opened = new EventEmitter();
	@Output() closed = new EventEmitter();
	@Output() change = new EventEmitter();

	ngOnInit() {
		if (this.options.open && this.options.disabled) {
			this.options.open = false;
		}
	}

	changeView(view: string): void {
		this.currentView = view;
	}

	dateSelected(date: Date, dateId: string): void {
		this.selectedDayId = dateId;
		this.selectedDate = date;
		this.close();
	}

	monthSelected(monthId: string): void {
		this.selectedMonthId = monthId;
		this.changeView(CurrentView.Month);
	}

	yearSelected(yearId: string): void {
		this.selectedYearId = yearId;
		this.changeView(CurrentView.Year);
	}

	open(): void {
		this.options.open = true;
		this.opened.emit();
	}

	close(): void {
		this.options.open = false;
		this.closed.emit();
	}

	toggle(): void {
		this.options.open = !this.options.open;
		if (this.options.open) {
			this.opened.emit();
		} else {
			this.closed.emit();
		}
	}

	input(value: string, format?: string): void {
		// for the input field
	}

	parse(value: any): Date {
		if (value instanceof Date && isValid(value)) {
			return value;
		}

		if (typeof(value) === 'string') {
			/*const date = toDate(value);
			if (isValid(date)) {
				return date;
			}*/
		}

		// if moment.isMoment(value) return moment-to-date
	}
}
