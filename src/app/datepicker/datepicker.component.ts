import { Component, OnInit, Input } from '@angular/core';
import { DatepickerOptions } from '../models/datepicker-options';
import { CurrentView } from '../models/enums';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit {
	private internalDate = new Date();

	public selectedMonthId: string;
	public selectedYearId: string;
	public selectedDayId: string;
	public currentView = 'year';

	@Input()
	public get date() {
		return this.internalDate;
	}
	public set date(value) {
		this.internalDate = value;
	}

	@Input() datepickerOptions = new DatepickerOptions();
	@Input() selectedDate: Date;

	ngOnInit() {
	}

	changeView(view: string): void {
		this.currentView = view;
	}

	dateSelected(date: Date, dateId: string): void {
		this.selectedDayId = dateId;
		this.selectedDate = date;
	}

	monthSelected(monthId: string): void {
		this.selectedMonthId = monthId;
		this.changeView(CurrentView.Month);
	}

	yearSelected(yearId: string): void {
		this.selectedYearId = yearId;
		this.changeView(CurrentView.Year);
	}
}
