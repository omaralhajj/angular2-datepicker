import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
	declarations: [
		DatepickerComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule
	],
	exports: [DatepickerComponent]
})
export class DatepickerModule { }
