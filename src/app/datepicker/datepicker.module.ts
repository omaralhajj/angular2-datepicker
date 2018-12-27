import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { DatepickerComponent } from './datepicker.component';
import { CalendarModule } from './calendar/calendar.module';

@NgModule({
	declarations: [
		DatepickerComponent
	],
	imports: [
		CommonModule,
		CalendarModule
	],
	exports: [DatepickerComponent]
})
export class DatepickerModule { }
