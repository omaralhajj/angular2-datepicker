import {
animate,
state,
style,
transition,
trigger,
AnimationTriggerMetadata,
} from '@angular/animations';

export const DatepickerAnimations: {
	readonly transformPanel: AnimationTriggerMetadata;
	readonly fadeInCalendar: AnimationTriggerMetadata;
} = {
	transformPanel: trigger('transformPanel', [
	state('void', style({
		opacity: 0,
		transform: 'scale(1, 0.8)'
	})),
	transition('void => enter',  animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
		opacity: 1,
		transform: 'scale(1, 1)'
	}))),
	transition('* => void', animate('100ms linear', style({opacity: 0})))
	]),

	fadeInCalendar: trigger('fadeInCalendar', [
	state('void', style({opacity: 0})),
	state('enter', style({opacity: 1})),

	transition('void => *', animate('120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
	])
};
