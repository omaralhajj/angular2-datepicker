import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatepickerOptions } from 'src/app/models/datepicker-options';
import { Month } from 'src/app/models/month';
import { isThisMonth, addYears, subYears } from 'date-fns';
import { CurrentView } from 'src/app/models/enums';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
	selector: 'app-year-view',
	templateUrl: './year-view.component.html',
	styleUrls: ['./year-view.component.less']
})
export class YearViewComponent extends BaseViewComponent implements OnInit {

	public months = new Array<Month>();
	public currentView = CurrentView;
	public buttonText: number;

	@Input() options: DatepickerOptions;
	@Input() selectedMonthId: DatepickerOptions;

	@Output() monthSelected = new EventEmitter();

	constructor() {
		super();
	}

	ngOnInit() {
		this.update();
	}

	update(): void {
		this.months.length = 0;
		const labels = Object.values(this.options.monthLabels);
		for (let i = 0; i <= 11; i++) {
			this.months.push(new Month({
				date: this.internalDate,
				month: i,
				label: labels[i],
				isThisMonth: isThisMonth(new Date(this.internalDate.getFullYear(), i, 1)),
				isSelected: false,
				id: this.internalDate.getFullYear().toString() + i.toString()
			}));
		}
		this.buttonText = this.internalDate.getFullYear();
	}

	public selectMonth(id: string): void {
		this.months.forEach((item) => {
				if (item.id === id) {
					item.isSelected = true;
					this.internalDate = item.date;
					this.monthSelected.emit(id);
				} else {
					item.isSelected = false;
				}
			});
	}

	nextPage(): void {
		this.internalDate = addYears(this.internalDate, 1);
		this.update();
	}

	previousPage(): void {
		this.internalDate = subYears(this.internalDate, 1);
		this.update();
	}

	public getCssClass(month: Month): string {
		if (month.isSelected && month.isThisMonth) {
			return 'month this-month-selected';
		}

		if (month.isSelected) {
			return 'month selected';
		}

		if (month.isThisMonth) {
			return 'month this-month';
		}

		return 'month';
	}
}
