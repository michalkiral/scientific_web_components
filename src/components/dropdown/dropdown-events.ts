export const DropdownEvents = {
  OPTION_SELECTED: 'option-selected',
  OPTION_CLEARED: 'option-cleared',
  CHANGE: 'change',
} as const;

export type DropdownEventName = typeof DropdownEvents[keyof typeof DropdownEvents];
