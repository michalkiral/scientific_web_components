export const FormEvents = {
  FORM_SUBMIT_START: 'form-submit-start',
  FORM_SUBMIT_SUCCESS: 'form-submit-success',
  FORM_SUBMIT_ERROR: 'form-submit-error',
  FORM_CANCEL: 'form-cancel',
  FORM_RESET: 'form-reset',
} as const;

export type FormEventName = typeof FormEvents[keyof typeof FormEvents];
