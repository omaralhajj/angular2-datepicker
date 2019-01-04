import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from './datepicker.component';
import { MultiYearViewModule } from './multi-year-view/multi-year-view.module';
import { YearViewModule } from './year-view/year-view.module';
import { MonthViewModule } from './month-view/month-view.module';
import { MatInputModule, MatIconModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		DatepickerComponent
	],
	imports: [
		CommonModule,
		MonthViewModule,
		MultiYearViewModule,
		YearViewModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		BrowserAnimationsModule
	],
	exports: [DatepickerComponent]
})
export class DatepickerModule { }
