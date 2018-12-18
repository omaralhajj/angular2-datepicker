import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		DatepickerComponent
	],
	imports: [
		CommonModule
	],
	exports: [DatepickerComponent]
})
export class DatepickerModule { }
