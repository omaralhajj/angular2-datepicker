import { BaseDate } from './base-date';

export class Month extends BaseDate {
	label: string;
	isThisMonth: boolean;


	constructor(options?: Partial<Month>) {
		super();
		if (options) {
			Object.assign(this, options);
		}
	}
}
