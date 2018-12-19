export class Day {
	date: Date;
	dateString: String;
	day: number;
	month: number;
	year: number;
	isThisMonth: boolean;
	isToday: boolean;
	isSelected: boolean;
	disabled: boolean;

	constructor(options: Partial<Day>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
