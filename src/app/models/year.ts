export class Year {
	date: Date;
	dateString: String;
	year: number;
	yearsToAdd: number;
	isSelected: boolean;
	isThisYear: boolean;
	disabled: boolean;
	id: string;

	constructor(options?: Partial<Year>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
