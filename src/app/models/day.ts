export class Day {
	date: Date;
	dateString: String;
	day: number;
	month: number;
	year: number;
	isInCurrentMonth: boolean;
	isToday: boolean;
	isSelected: boolean;
	isSelectable: boolean;

	constructor(options: Partial<Day>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
