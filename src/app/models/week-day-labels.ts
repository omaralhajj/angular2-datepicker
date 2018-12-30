export class WeekDayLabels {
	sunday = 'S';
	monday = 'M';
	tuesday = 'T';
	wednesday = 'W';
	thursday = 'T';
	friday = 'F';
	saturday = 'S';
	constructor(options?: Partial<WeekDayLabels>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
