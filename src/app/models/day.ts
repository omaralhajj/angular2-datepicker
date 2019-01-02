import { BaseDate } from './base-date';

export class Day extends BaseDate {
	isThisMonth: boolean;
	isToday: boolean;

	constructor(options: Partial<Day>) {
		super();
		if (options) {
			Object.assign(this, options);
		}
	}
}
