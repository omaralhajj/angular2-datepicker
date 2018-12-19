import { DayLabels } from './day-labels';

export class DatepickerOptions {
	enableDateRange = false;
	showTodayButton = true;
	minYear: number | string = 1900;
	maxYear: number | string = 2099;
	// dateFormat = 'dd-mm-yyyy';

	constructor(options?: Partial<DatepickerOptions>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
