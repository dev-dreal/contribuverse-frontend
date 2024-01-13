import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

export const fadingAnimation = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(500, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate(500, style({ opacity: 0 })),
  ]),
]);

export const quarterCircleAnimation = trigger('slideInAndOut', [
  state('enterBottomLeft', style({})), // Placeholder for the state
  state('enterTopRight', style({})), // Placeholder for the state
  state('leaveBottomLeft', style({})), // Placeholder for the state
  state('leaveTopRight', style({})), // Placeholder for the state

  transition('* => enterBottomLeft', [
    animate(
      '500ms ease-in',
      keyframes([
        style({ transform: 'translateX(-100%) translateY(100%)', offset: 0 }),
        style({ transform: 'translateX(-50%) translateY(50%)', offset: 0.5 }),
        style({ transform: 'translateX(0) translateY(0)', offset: 1 }),
      ])
    ),
  ]),
  transition('enterBottomLeft => *', [
    animate(
      '500ms ease-out',
      keyframes([
        style({ transform: 'translateX(0) translateY(0)', offset: 0 }),
        style({ transform: 'translateX(50%) translateY(-50%)', offset: 0.5 }),
        style({ transform: 'translateX(100%) translateY(-100%)', offset: 1 }),
      ])
    ),
  ]),

  transition('* => enterTopRight', [
    animate(
      '500ms ease-in',
      keyframes([
        style({ transform: 'translateX(100%) translateY(-100%)', offset: 0 }),
        style({ transform: 'translateX(50%) translateY(-50%)', offset: 0.5 }),
        style({ transform: 'translateX(0) translateY(0)', offset: 1 }),
      ])
    ),
  ]),
  transition('enterTopRight => *', [
    animate(
      '500ms ease-out',
      keyframes([
        style({ transform: 'translateX(0) translateY(0)', offset: 0 }),
        style({ transform: 'translateX(-50%) translateY(50%)', offset: 0.5 }),
        style({ transform: 'translateX(-100%) translateY(100%)', offset: 1 }),
      ])
    ),
  ]),
  // Transition for leaving to bottom left
  transition('* => leaveBottomLeft', [
    animate(
      '500ms ease-out',
      keyframes([
        style({ transform: 'translateX(0) translateY(0)', offset: 0 }),
        style({ transform: 'translateX(-50%) translateY(50%)', offset: 0.5 }),
        style({ transform: 'translateX(-100%) translateY(100%)', offset: 1 }),
      ])
    ),
  ]),
  // Transition for leaving to top right
  transition('* => leaveTopRight', [
    animate(
      '500ms ease-out',
      keyframes([
        style({ transform: 'translateX(0) translateY(0)', offset: 0 }),
        style({ transform: 'translateX(50%) translateY(-50%)', offset: 0.5 }),
        style({ transform: 'translateX(100%) translateY(-100%)', offset: 1 }),
      ])
    ),
  ]),
]);
