import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { MultiYearViewComponent } from './multi-year-view.component';

@NgModule({
	declarations: [
		MultiYearViewComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule
	],
	exports: [MultiYearViewComponent]
})
export class MultiYearViewModule { }
