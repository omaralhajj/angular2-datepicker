import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatDividerModule } from '@angular/material';

@NgModule({
	declarations: [
		CalendarComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule
	],
	exports: [CalendarComponent]
})
export class CalendarModule { }
