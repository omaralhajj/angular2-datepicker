import { Component, Output, EventEmitter } from '@angular/core';
import { CurrentView } from 'src/app/models/enums';

@Component({
	selector: 'app-base-view',
	templateUrl: './base-view.component.html'
})
export class BaseViewComponent {
	public currentView = CurrentView;

	@Output() buttonClick = new EventEmitter();

	constructor() { }

	buttonClicked(view: CurrentView): void {
		this.buttonClick.emit(view);
	}
}
