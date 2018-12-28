import { Month } from './enums';

export class Day {
	date: Date;
	dateString: String;
	day: number;
	month: Month;
	year: number;
	isThisMonth: boolean;
	isToday: boolean;
	isSelected: boolean;
	disabled: boolean;
	id: string;

	constructor(options: Partial<Day>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
