import { WeekDayLabels } from './week-day-labels';
import { MonthLabels } from './month-labels';

export class DatepickerOptions {
	private _startDayOfWeek = 0; // 0-6, sunday-saturday

	get startDayOfWeek() {
		return this._startDayOfWeek;
	}
	set startDayOfWeek(value) {
		if (value > 6) {
			this._startDayOfWeek = 0;
		} else {
			this._startDayOfWeek = value;
		}
	}

	enableDateRange = false;
	minYear = '1900';
	maxYear = '2100';
	minDate: Date;
	maxDate: Date;
	weekDayLabels = new WeekDayLabels();
	monthLabels = new MonthLabels();
	weekLabel = 'Week';
	disabled = false;
	open = false;
	startAt: Date;
	currentView = 'month';
	// dateFormat = 'dd-mm-yyyy';

	constructor(options?: Partial<DatepickerOptions>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
