import { BaseDate } from './base-date';

export class Year extends BaseDate {
	yearsToAdd: number;
	isThisYear: boolean;

	constructor(options?: Partial<Year>) {
		super();
		if (options) {
			Object.assign(this, options);
		}
	}
}
