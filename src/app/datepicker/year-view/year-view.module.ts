import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { YearViewComponent } from './year-view.component';

@NgModule({
	declarations: [
		YearViewComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule
	],
	exports: [YearViewComponent]
})
export class YearViewModule { }
