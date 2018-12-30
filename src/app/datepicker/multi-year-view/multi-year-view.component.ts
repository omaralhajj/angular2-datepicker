import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CurrentView } from 'src/app/models/enums';
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

	public years = new Array<Year>();
	public buttonText: string;

	@Input() selectedYearId: string;
	@Input() options: DatepickerOptions;

	@Output() yearSelected = new EventEmitter();

	constructor() {
		super();
	}

	ngOnInit() {
		this.update();
	}

	update(): void {
		this.years.length = 0;
		const startIndex = this.internalDate.getFullYear() % 24;
		for (let i = 0 - startIndex; i < 24 - startIndex; i++) {
			const year = this.internalDate.getFullYear() + i;
			this.years.push(new Year({
				date: this.internalDate,
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
		this.internalDate = addYears(this.internalDate, 24);
		this.update();
	}

	previousPage(): void {
		this.internalDate = subYears(this.internalDate, 24);
		this.update();
	}

	public selectYear(id: string): void {
		this.years.forEach((item) => {
				if (item.id === id) {
					item.isSelected = true;
					this.internalDate = item.date;
					this.yearSelected.emit(id);
				} else {
					item.isSelected = false;
				}
			});
	}
}
