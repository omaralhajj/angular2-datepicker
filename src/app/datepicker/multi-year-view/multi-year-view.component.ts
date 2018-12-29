import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CurrentView } from 'src/app/models/enums';
import { isThisYear, addYears, subYears } from 'date-fns';
import { Year } from 'src/app/models/year';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
	selector: 'app-multi-year-view',
	templateUrl: './multi-year-view.component.html',
	styleUrls: ['./multi-year-view.component.less']
})
export class MultiYearViewComponent extends BaseViewComponent implements OnInit {

	public years = new Array<Year>();
	public date = new Date();
	public buttonText: string;

	@Input() selectedYearId: string;

	@Output() yearSelected = new EventEmitter();

	constructor() {
		super();
	}

	ngOnInit() {
		this.update();
	}

	update(): void {
		this.years.length = 0;
		const startIndex = this.date.getFullYear() % 24;
		for (let i = 0 - startIndex; i < 24 - startIndex; i++) {
			const year = this.date.getFullYear() + i;
			this.years.push(new Year({
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
		this.date = addYears(this.date, 24);
		this.update();
	}

	previousPage(): void {
		this.date = subYears(this.date, 24);
		this.update();
	}

	public selectYear(id: string): void {
		this.years.forEach((item) => {
				if (item.id === id) {
					item.isSelected = true;
					this.yearSelected.emit(id);
				} else {
					item.isSelected = false;
				}
			});
	}
}
