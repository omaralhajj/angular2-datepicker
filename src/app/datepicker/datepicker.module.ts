import { NgModule } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatDividerModule } from '@angular/material';

@NgModule({
	declarations: [
		DatepickerComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule
	],
	exports: [DatepickerComponent]
})
export class DatepickerModule { }
