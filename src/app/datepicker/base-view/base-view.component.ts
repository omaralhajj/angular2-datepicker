import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CurrentView } from 'src/app/models/enums';
import { Day } from 'src/app/models/day';
import { Year } from 'src/app/models/year';

@Component({
	selector: 'app-base-view',
	templateUrl: './base-view.component.html'
})
export class BaseViewComponent {
	public currentView = CurrentView;

	private _internalDate: Date;

	@Input()
	get internalDate() {
		return this._internalDate;
	}
	set internalDate(value: Date) {
		this._internalDate = value;
		this.internalDateChange.emit(this._internalDate);
	}

	@Output() buttonClick = new EventEmitter();
	@Output() internalDateChange = new EventEmitter();

	constructor() { }

	buttonClicked(view: CurrentView): void {
		this.buttonClick.emit(view);
	}
}
