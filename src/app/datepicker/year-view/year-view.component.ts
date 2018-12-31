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

	public internalDateCopy: Date;

	@Input() options: DatepickerOptions;
	@Input() selectedMonthId: string;

	@Output() monthSelected = new EventEmitter();

	constructor() {
		super();
	}

	ngOnInit() {
		this.internalDateCopy = this.internalDate;
		this.update();
	}

	update(): void {
		this.months.length = 0;
		const labels = Object.values(this.options.monthLabels);
		for (let i = 0; i <= 11; i++) {
			const date = new Date(this.internalDateCopy.getFullYear(), i, 2);
			this.months.push(new Month({
				date: date,
				month: i,
				label: labels[i],
				isThisMonth: isThisMonth(date),
				isSelected: false,
				id: this.internalDateCopy.getFullYear().toString() + i.toString()
			}));
		}
		this.buttonText = this.internalDateCopy.getFullYear();

		this.selectMonth(this.selectedMonthId);
	}

	public selectMonth(id: string, emitChange = false): void {
		this.months.forEach((item) => {
				if (item.id === id) {
					item.isSelected = true;
					this.internalDate = item.date;
				} else {
					item.isSelected = false;
				}
			});

		// Because we only want to emit a change when we actually click on a date, and not everytime update() is called
		if (emitChange) {
			this.monthSelected.emit(id);
		}
	}

	nextPage(): void {
		this.internalDateCopy = addYears(this.internalDateCopy, 1);
		this.update();
	}

	previousPage(): void {
		this.internalDateCopy = subYears(this.internalDateCopy, 1);
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
