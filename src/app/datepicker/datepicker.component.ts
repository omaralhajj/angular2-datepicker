import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.less']
})
export class DatepickerComponent implements OnInit {
	private internalDate = new Date();

	public currentView = 'month';
	public selectedDate: Date;
	public selectedYearId: string;
	public selectedMonthId: string;
	public selectedDayId: string;

	@Input()
	public get date() {
		return this.internalDate;
	}
	public set date(value) {
		this.internalDate = value;
	}

	ngOnInit() {
	}

	changeView(view: string): void {
		this.currentView = view;
	}
}
