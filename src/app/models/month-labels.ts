export class MonthLabels {
	january = 'JAN';
	feburary = 'FEB';
	march = 'MAR';
	april = 'APR';
	may = 'MAY';
	june = 'JUN';
	july = 'JUL';
	august = 'AUG';
	september = 'SEP';
	october = 'OCT';
	november = 'NOV';
	december = 'DEC';

	constructor(options?: Partial<MonthLabels>) {
		if (options) {
			Object.assign(this, options);
		}
	}
}
