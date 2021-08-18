import type { TranslateData } from 'core/utils/translate';
import type { FormLayout } from 'core/types/form/layout';
import type { ButtonProps } from 'core/types/form/fields/button';
import type { FormInteractionsData } from 'core/types/form/base';

export type DialogFormInteractions = (data: Record<string, any>, formData: FormInteractionsData) => void

/** Dialog form is a hidden form that you can call inside the main form (only in 'card' pages) */
export interface DialogForm {
  /** Unique name of the form */
  name: string,

  /** Is the form initially open */
  open: boolean,

  /** Show dialog on mobile screens. Uses drawer from bottom by default */
  dialogOnMobile?: boolean,

  /** Title of the dialog (or drawer in case of mobile) */
  title?: TranslateData,

  /** Form layout */
  layout: FormLayout,

  /** Form submit button */
  submit: ButtonProps | null,

  /** Call this action on form submit. Has 'data' property as an argument with the field-value object */
  submitAction?: DialogFormInteractions,

  size?: 'medium'|'small'|'mini',
}
