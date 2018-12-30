export class Month {
	date: Date;
	label: string;
	month: number;
	isSelected: boolean;
	isThisMonth: boolean;
	disabled: boolean;
	id: string;

	constructor(options?: Partial<Month>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
