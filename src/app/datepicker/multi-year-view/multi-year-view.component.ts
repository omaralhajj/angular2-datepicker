import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { isThisYear, addYears, subYears } from 'date-fns';
import { Year } from 'src/app/models/year';
import { BaseViewComponent } from '../base-view/base-view.component';
import { DatepickerOptions } from 'src/app/models/datepicker-options';

@Component({
	selector: 'app-multi-year-view',
	templateUrl: './multi-year-view.component.html',
	styleUrls: ['./multi-year-view.component.less']
})
export class MultiYearViewComponent extends BaseViewComponent implements OnInit {
	// Copy of internal date since we don't want to change internalDate unless a date is explicitly selected
	private internalDateCopy: Date;

	public years = new Array<Year>();
	public buttonText: string;


	@Input() selectedYearId: string;
	@Input() options: DatepickerOptions;

	@Output() yearSelected = new EventEmitter();

	constructor() {
		super();
	}

	ngOnInit() {
		this.internalDateCopy = this.internalDate;
		this.update();
	}

	update(): void {
		this.years.length = 0;
		const startIndex = this.internalDateCopy.getFullYear() % 24;
		for (let i = 0 - startIndex; i < 24 - startIndex; i++) {
			const year = this.internalDateCopy.getFullYear() + i;
			this.years.push(new Year({
				date: addYears(this.internalDateCopy, i),
				year: year,
				yearsToAdd: i,
				isThisYear: isThisYear(new Date(year, 0, 1)),
				id: year.toString(),
				isSelected: false
			}));
		}
		this.selectYear(this.selectedYearId);
		this.buttonText = `${this.years[0].year} – ${this.years[23].year}`;
	}

	public getCssClass(year: Year): string {
		if (year.isSelected && year.isThisYear) {
			return 'year this-year-selected';
		}

		if (year.isSelected) {
			return 'year selected';
		}

		if (year.isThisYear) {
			return 'year this-year';
		}

		return 'year';
	}

	nextPage(): void {
		this.internalDateCopy = addYears(this.internalDateCopy, 24);
		this.update();
	}

	previousPage(): void {
		this.internalDateCopy = subYears(this.internalDateCopy, 24);
		this.update();
	}

	public selectYear(id: string, emitChange = false): void {
		this.years.forEach((item) => {
				if (item.id === id) {
					item.isSelected = true;
					this.internalDate = item.date;
				} else {
					item.isSelected = false;
				}
			});

		// Because we only want to emit a change when we actually click on a date, and not everytime update() is called
		if (emitChange) {
			this.yearSelected.emit(id);
		}
	}
}
