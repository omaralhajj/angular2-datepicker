import { NgModule } from '@angular/core';
import { MonthViewComponent } from './month-view.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatDividerModule } from '@angular/material';

@NgModule({
	declarations: [
		MonthViewComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule
	],
	exports: [MonthViewComponent]
})
export class MonthViewModule { }
